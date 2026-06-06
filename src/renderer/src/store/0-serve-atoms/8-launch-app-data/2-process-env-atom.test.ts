import { describe, it, expect, vi } from 'vitest';
import { atom } from 'jotai';

vi.mock('@/xternal-to-main', () => ({
    R2MInvokes: { getProcessEnv: vi.fn() },
    hasMain: vi.fn(() => false),
}));

import { expandEnvVariablesWindows, replacePathWithEnvVars, processEnvAtom } from './2-process-env-atom';

// Mock environment variables matching a typical Windows machine
const mockEnv: Record<string, string> = {
    'ProgramFiles':       'C:\\Program Files',
    'ProgramFiles(x86)':  'C:\\Program Files (x86)',
    'ProgramW6432':       'C:\\Program Files',
    'APPDATA':            'C:\\Users\\TestUser\\AppData\\Roaming',
    'LOCALAPPDATA':       'C:\\Users\\TestUser\\AppData\\Local',
};

/** Create a mock jotai `get` that returns `mockEnv` for `processEnvAtom`. */
function mockGet(envOverride?: Record<string, string>) {
    const env = envOverride ?? mockEnv;
    return (<V>(a: unknown): V => {
        if (a === processEnvAtom) {
            return env as V;
        }
        throw new Error('Unexpected atom');
    }) as import('jotai').Getter;
}

// ── expandEnvVariablesWindows ───────────────────────────────────────────

describe('expandEnvVariablesWindows', () => {
    const get = mockGet();

    it('should expand %ProgramFiles% to its value', () => {
        expect(expandEnvVariablesWindows('%ProgramFiles%\\MyApp\\app.exe', get))
            .toBe('C:\\Program Files\\MyApp\\app.exe');
    });

    it('should expand %ProgramFiles(x86)% to its value', () => {
        expect(expandEnvVariablesWindows('%ProgramFiles(x86)%\\MyApp\\app.exe', get))
            .toBe('C:\\Program Files (x86)\\MyApp\\app.exe');
    });

    it('should expand %APPDATA% to its value', () => {
        expect(expandEnvVariablesWindows('%APPDATA%\\MyApp\\config.json', get))
            .toBe('C:\\Users\\TestUser\\AppData\\Roaming\\MyApp\\config.json');
    });

    it('should expand %LOCALAPPDATA% to its value', () => {
        expect(expandEnvVariablesWindows('%LOCALAPPDATA%\\MyApp\\cache', get))
            .toBe('C:\\Users\\TestUser\\AppData\\Local\\MyApp\\cache');
    });

    it('should expand multiple env vars in one string', () => {
        expect(expandEnvVariablesWindows('%ProgramFiles%\\foo and %APPDATA%\\bar', get))
            .toBe('C:\\Program Files\\foo and C:\\Users\\TestUser\\AppData\\Roaming\\bar');
    });

    it('should leave unknown %VAR% patterns unchanged', () => {
        expect(expandEnvVariablesWindows('%UNKNOWN_VAR%\\file.txt', get))
            .toBe('%UNKNOWN_VAR%\\file.txt');
    });

    it('should return the string unchanged when no env patterns present', () => {
        expect(expandEnvVariablesWindows('C:\\plain\\path\\file.txt', get))
            .toBe('C:\\plain\\path\\file.txt');
    });

    it('should handle empty string', () => {
        expect(expandEnvVariablesWindows('', get)).toBe('');
    });

    it('should handle string with only a percent sign', () => {
        expect(expandEnvVariablesWindows('100%', get)).toBe('100%');
    });
});

// ── replacePathWithEnvVars ──────────────────────────────────────────────

describe('replacePathWithEnvVars', () => {
    const get = mockGet();

    // ── Program Files ───────────────────────────────────────────────

    it('should replace Program Files (x86) path with %ProgramFiles(x86)%', () => {
        expect(replacePathWithEnvVars('C:\\Program Files (x86)\\MyApp\\app.exe', get))
            .toBe('%ProgramFiles(x86)%\\MyApp\\app.exe');
    });

    it('should replace Program Files path with %ProgramW6432% (same value, listed before ProgramFiles)', () => {
        // ProgramW6432 and ProgramFiles both resolve to "C:\Program Files";
        // ProgramW6432 is listed earlier, so it wins when values have equal length.
        expect(replacePathWithEnvVars('C:\\Program Files\\MyApp\\app.exe', get))
            .toBe('%ProgramW6432%\\MyApp\\app.exe');
    });

    // ── APPDATA ─────────────────────────────────────────────────────

    it('should replace APPDATA path with %APPDATA%', () => {
        expect(replacePathWithEnvVars('C:\\Users\\TestUser\\AppData\\Roaming\\MyApp\\config.json', get))
            .toBe('%APPDATA%\\MyApp\\config.json');
    });

    it('should replace LOCALAPPDATA path with %LOCALAPPDATA%', () => {
        expect(replacePathWithEnvVars('C:\\Users\\TestUser\\AppData\\Local\\MyApp\\cache', get))
            .toBe('%LOCALAPPDATA%\\MyApp\\cache');
    });

    // ── Case-insensitive matching ───────────────────────────────────

    it('should match case-insensitively for Program Files', () => {
        expect(replacePathWithEnvVars('c:\\program files\\myapp\\app.exe', get))
            .toBe('%ProgramW6432%\\myapp\\app.exe');
    });

    it('should match case-insensitively for APPDATA', () => {
        expect(replacePathWithEnvVars('c:\\users\\testuser\\appdata\\roaming\\MyApp\\config.json', get))
            .toBe('%APPDATA%\\MyApp\\config.json');
    });

    it('should match case-insensitively for LOCALAPPDATA', () => {
        expect(replacePathWithEnvVars('c:\\users\\testuser\\appdata\\local\\MyApp\\cache', get))
            .toBe('%LOCALAPPDATA%\\MyApp\\cache');
    });

    // ── Edge cases ──────────────────────────────────────────────────

    it('should return empty string for empty input', () => {
        expect(replacePathWithEnvVars('', get)).toBe('');
    });

    it('should return the path unchanged when no env path matches', () => {
        expect(replacePathWithEnvVars('D:\\SomeOther\\Path\\file.txt', get))
            .toBe('D:\\SomeOther\\Path\\file.txt');
    });

    it('should prefer longer match (ProgramFiles(x86) over ProgramFiles)', () => {
        // Both "C:\Program Files (x86)" and "C:\Program Files" would match at the start,
        // but the longer one should win.
        expect(replacePathWithEnvVars('C:\\Program Files (x86)\\something', get))
            .toBe('%ProgramFiles(x86)%\\something');
    });

    it('should handle filepath that equals the env value exactly', () => {
        expect(replacePathWithEnvVars('C:\\Users\\TestUser\\AppData\\Roaming', get))
            .toBe('%APPDATA%');
    });

    it('should handle filepath that equals LOCALAPPDATA value exactly', () => {
        expect(replacePathWithEnvVars('C:\\Users\\TestUser\\AppData\\Local', get))
            .toBe('%LOCALAPPDATA%');
    });
});
