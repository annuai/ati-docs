/*
  Signs and verifies the site-access cookie.

  Uses Web Crypto (`crypto.subtle`) rather than Node's `crypto` module so the exact same code runs
  in both the Edge Middleware (`middleware.js`) and the login Edge Function (`api/login.js`) — one
  implementation, no risk of the two disagreeing about what a valid token looks like.
*/

const encoder = new TextEncoder();
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days — matches the cookie's own Max-Age

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify'
  ]);
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function fromHex(hex) {
  const bytes = hex.match(/.{1,2}/g) || [];
  return new Uint8Array(bytes.map((byte) => parseInt(byte, 16)));
}

/** A signed token proving the passphrase was entered, valid for MAX_AGE_MS. */
export async function signToken(secret) {
  const key = await hmacKey(secret);
  const timestamp = Date.now().toString();
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp));
  return `${timestamp}.${toHex(signature)}`;
}

export async function verifyToken(token, secret) {
  if (!token || !token.includes('.')) return false;
  const [timestamp, signatureHex] = token.split('.');
  if (!timestamp || !signatureHex) return false;
  if (Date.now() - Number(timestamp) > MAX_AGE_MS) return false;

  const key = await hmacKey(secret);
  return crypto.subtle.verify('HMAC', key, fromHex(signatureHex), encoder.encode(timestamp));
}

/** Constant-time-ish comparison: hash both sides first so length itself leaks nothing. */
export async function passphraseMatches(submitted, expected) {
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(submitted)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected))
  ]);
  const bytesA = new Uint8Array(a);
  const bytesB = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < bytesA.length; i += 1) diff |= bytesA[i] ^ bytesB[i];
  return diff === 0;
}

export const ACCESS_COOKIE = 'ati_docs_auth';
