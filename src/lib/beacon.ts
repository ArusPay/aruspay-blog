const TOKEN_RE = /^[a-f0-9]{32}$/;
export function beaconToken(env: string, raw: string | undefined): string | null {
  return env === 'production' && raw && TOKEN_RE.test(raw) ? raw : null;
}
