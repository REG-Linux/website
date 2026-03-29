import { handleMatrix } from './routes/matrix';
import { handleDevice } from './routes/device';
import { handleSubmit } from './routes/submit';
import { handleAuthGithub, handleAuthCallback, handleAuthMe } from './routes/auth';
import { handleDeviceRegister } from './routes/device-register';
import { handleAdminDevices, handleAdminDevice, handleAdminDeviceUpdate, handleAdminRun, handleAdminRuns } from './routes/admin';
import type { Env } from './types';

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
  // Scheduled: purge stale device tokens (runs daily via cron trigger)
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
    // Delete device tokens not used in over 1 year
    await env.DB.prepare(
      `DELETE FROM device_tokens
       WHERE last_used < datetime('now', '-1 year')
         OR (last_used IS NULL AND created_at < datetime('now', '-1 year'))`,
    ).run();

    // Delete test results from revoked tokens
    await env.DB.prepare(
      `DELETE FROM test_results WHERE author IN (
        SELECT 'device:' || substr(system_uuid, 1, 8) FROM device_tokens WHERE revoked = 1
      )`,
    ).run();

    // Delete revoked tokens themselves
    await env.DB.prepare('DELETE FROM device_tokens WHERE revoked = 1').run();
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS
    const origin = request.headers.get('Origin') ?? '';
    const allowed = [env.CORS_ORIGIN, 'https://reglinux.org'];
    const cors = allowed.includes(origin) ? corsHeaders(origin) : {};

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
      } else if (method === 'GET' && path === '/api/admin/devices') {
        response = await handleAdminDevices(request, env);
      } else if (method === 'GET' && path.startsWith('/api/admin/device/')) {
        const deviceId = decodeURIComponent(path.slice('/api/admin/device/'.length));
        response = await handleAdminDevice(request, env, deviceId);
      } else if (method === 'PUT' && path.startsWith('/api/admin/device/')) {
        const deviceId = decodeURIComponent(path.slice('/api/admin/device/'.length));
        response = await handleAdminDeviceUpdate(request, env, deviceId);
      } else if (method === 'POST' && path.startsWith('/api/admin/run/')) {
        const pipeline = path.slice('/api/admin/run/'.length);
        response = await handleAdminRun(request, env, pipeline);
      } else if (method === 'GET' && path === '/api/admin/runs') {
        response = await handleAdminRuns(request, env);
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
