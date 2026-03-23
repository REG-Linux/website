import { handleMatrix } from './routes/matrix';
import { handleDevice } from './routes/device';
import { handleSubmit } from './routes/submit';
import { handleAuthGithub, handleAuthCallback, handleAuthMe } from './routes/auth';
import { handleDeviceRegister } from './routes/device-register';
import type { Env } from './types';

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

function addCors(response: Response, headers: Record<string, string>): Response {
  const merged = new Headers(response.headers);
  for (const [k, v] of Object.entries(headers)) merged.set(k, v);
  return new Response(response.body, { status: response.status, headers: merged });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS
    const origin = request.headers.get('Origin') ?? '';
    const allowed = [env.CORS_ORIGIN, 'https://reglinux.org'];
    const isLocalhost = origin.startsWith('http://localhost:');
    const cors = (allowed.includes(origin) || isLocalhost) ? corsHeaders(origin) : {};

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      let response: Response;

      if (method === 'GET' && path === '/api/matrix') {
        response = await handleMatrix(request, env);
      } else if (method === 'GET' && path.startsWith('/api/device/')) {
        const deviceId = decodeURIComponent(path.slice('/api/device/'.length));
        response = await handleDevice(request, env, deviceId);
      } else if (method === 'POST' && path === '/api/submit') {
        response = await handleSubmit(request, env);
      } else if (method === 'POST' && path === '/api/device-register') {
        response = await handleDeviceRegister(request, env);
      } else if (method === 'GET' && path === '/api/auth/github') {
        response = await handleAuthGithub(request, env);
      } else if (method === 'GET' && path === '/api/auth/callback') {
        response = await handleAuthCallback(request, env);
      } else if (method === 'GET' && path === '/api/auth/me') {
        response = await handleAuthMe(request, env);
      } else {
        response = Response.json({ error: 'not_found' }, { status: 404 });
      }

      return addCors(response, cors);
    } catch (err) {
      console.error(err);
      return addCors(Response.json({ error: 'internal_error' }, { status: 500 }), cors);
    }
  },
};
