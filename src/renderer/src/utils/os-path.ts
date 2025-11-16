// Cross-platform path utilities
// Re-exports from platform-specific modules

// Export all POSIX functions with 'posix' prefix
import * as posix from './os-path-posix';
export { posix };

// Export all Windows functions with 'win32' prefix
import * as win32 from './os-path-windows';
export { win32 };

// Export POSIX as default (matching Node.js path module behavior on POSIX systems)
export * from './os-path-posix';

// Also export types from both for convenience
export type { ParsedPath as ParsedWindowsPath } from './os-path-windows';
