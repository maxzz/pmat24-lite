# Version Sync Script (`sync-version.ts`)

This script synchronizes the application version specified in the project's root `.env` file with the `"version"` field in `package.json` before a build. This ensures that `electron-builder` and the Electron application are always compiled with the correct and up-to-date semantic build version.

---

## Purpose
In our development flow, the environment variable `VITE_BUILD` acts as the single source of truth for the application version. This variable is automatically updated or incremented at build time (e.g., by helper utilities like `upen`). 
Since `electron-builder` reads the application version directly from the `"version"` field in `package.json`, this script bridges the gap by automatically copying the updated version from `.env` to `package.json` before the build starts.

---

## Execution Flow

The script executes the following steps sequentially:

1. **Locate and Read `.env`**:
   - Locates the `.env` file at the root of the workspace.
   - Reads the file content and splits it into lines.
2. **Extract Version**:
   - Specifically parses **Line 2** (index `1`) of `.env` for the key `VITE_BUILD=`.
   - If line 2 is modified or empty, it uses a robust fallback regex search to find `VITE_BUILD` anywhere in the `.env` file content.
   - If no version is found, it terminates with an error.
3. **Compare with `package.json`**:
   - Reads and parses the workspace's `package.json`.
   - Compares the current `"version"` field in `package.json` with the extracted `VITE_BUILD` version.
   - If they are already identical, the script prints a message and exits early to avoid unnecessary file writes.
4. **Update & Format**:
   - If they differ, the script overwrites the `"version"` field in the memory object.
   - Saves the updated content back to `package.json`, preserving the original 4-space indentation layout and appending a clean newline.

---

## Demo Data / Example

### Input Root `.env`
```ini
VITE_MODIFIED=2026-06-04T22:13:28.637Z
VITE_BUILD=1.26.24
```

### Initial `package.json`
```json
{
    "name": "electron-react24",
    "version": "1.26.23",
    "description": "An Electron application with React and TypeScript"
}
```

### Console Output
```text
Extracted VITE_BUILD version from .env: 1.26.24
Successfully updated package.json version to: 1.26.24
```

### Output `package.json` (After Script Execution)
```json
{
    "name": "electron-react24",
    "version": "1.26.24",
    "description": "An Electron application with React and TypeScript"
}
```
