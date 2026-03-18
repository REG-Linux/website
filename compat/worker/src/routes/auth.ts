import type { Env } from '../types';
import { json } from '../lib/http';
import { signState, verifyState, issueJWT, verifyJWT, parseCookies, getJWTFromRequest, setCookie } from '../lib/auth';

export async function handleAuthGithub(_request: Request, env: Env): Promise<Response> {
  const state = await signState(env.JWT_SECRET);

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: env.GITHUB_REDIRECT_URI,
    scope: 'read:user',
    state,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      'Set-Cookie': setCookie('reg_state', state, 600),
    },
  });
}

export async function handleAuthCallback(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) return json({ error: 'missing code or state' }, 400);

  // Verify state against cookie
  const cookieHeader = request.headers.get('Cookie') ?? '';
  const cookies = parseCookies(cookieHeader);
  const storedState = cookies['reg_state'];

  if (!storedState || storedState !== state || !(await verifyState(state, env.JWT_SECRET))) {
    return json({ error: 'invalid_state' }, 400);
  }

  // Exchange code for GitHub access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json() as { access_token?: string; error?: string };
  if (!tokenData.access_token) {
    return json({ error: 'github_token_exchange_failed', detail: tokenData.error }, 400);
  }

  // Fetch GitHub user
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'User-Agent': 'reg-compat-worker/1.0',
      Accept: 'application/json',
    },
  });

  if (!userRes.ok) return json({ error: 'github_user_fetch_failed' }, 400);

  const user = await userRes.json() as { login: string; avatar_url: string };

  // Issue JWT
  const jwt = await issueJWT({
    sub: `github:${user.login}`,
    username: user.login,
    avatar: user.avatar_url,
  }, env.JWT_SECRET);

  // Determine redirect
  const redirect = url.searchParams.get('redirect');
  const target = redirect && redirect.startsWith('/') ? redirect : '/submit';

  return new Response(null, {
    status: 302,
    headers: new Headers([
      ['Location', target],
      ['Set-Cookie', setCookie('reg_auth', jwt, 7 * 24 * 3600)],
      ['Set-Cookie', setCookie('reg_state', '', 0)], // clear state cookie
    ]),
  });
}

export async function handleAuthMe(request: Request, env: Env): Promise<Response> {
  const token = getJWTFromRequest(request);
  if (!token) return json({ error: 'not_authenticated' }, 401);

  const payload = await verifyJWT(token, env.JWT_SECRET);
  if (!payload) return json({ error: 'invalid_token' }, 401);

  return json({ username: payload.username, avatar: payload.avatar });
}
