import { describe, it, expect } from 'vitest';
import { beaconToken } from '../src/lib/beacon';
describe('beaconToken', () => {
  it('only returns a valid token in production', () => {
    const t = '0123456789abcdef0123456789abcdef';
    expect(beaconToken('production', t)).toBe(t);
    expect(beaconToken('staging', t)).toBeNull();
    expect(beaconToken('production', undefined)).toBeNull();
    expect(beaconToken('production', 'x"><script>')).toBeNull();
  });
});
