import { ACCESS_COOKIE, passphraseMatches, signToken } from '../lib/auth.js';

// Edge runtime so this shares crypto behaviour exactly with middleware.js.
export const config = { runtime: 'edge' };

const MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const password = process.env.SITE_PASSWORD;
  const secret = process.env.SITE_ACCESS_SECRET;
  if (!password || !secret) {
    return new Response('Site access is not configured.', { status: 500 });
  }

  const form = await request.formData();
  const submitted = (form.get('password') || '').toString();
  const next = (form.get('next') || '/').toString();
  const url = new URL(request.url);

  if (!(await passphraseMatches(submitted, password))) {
    const loginUrl = new URL('/login.html', url);
    loginUrl.searchParams.set('next', next);
    loginUrl.searchParams.set('error', '1');
    return Response.redirect(loginUrl, 303);
  }

  const token = await signToken(secret);
  const redirectUrl = new URL(next.startsWith('/') ? next : '/', url);
  const response = Response.redirect(redirectUrl, 303);
  response.headers.append(
    'Set-Cookie',
    `${ACCESS_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE_SECONDS}`
  );
  return response;
}
