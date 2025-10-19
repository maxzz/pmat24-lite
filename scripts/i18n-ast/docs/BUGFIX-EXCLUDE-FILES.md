# Bug Fix: excludeFiles Option Not Working

## Issue

The `excludeFiles` configuration option was not properly excluding files when running `pnpm i18n:ast`.

### Example

**Config:**
```json
{
  "excludeFiles": [
    "src/shell/xternal-to-renderer/7-napi-calls/7-get-window-pos.ts"
  ]
}
```

**Problem:** The file was still appearing in the output:
```json
{
  "file:///C:/y/w/2-web/0-dp/pmat24-lite/src/shell/xternal-to-renderer/7-napi-calls/7-get-window-pos.ts": {
    "status": "{\"status\":"
  }
}
```

## Root Cause

In `4-scan-process.ts`, line 54, the code was only checking the **filename** instead of the **full path**:

```typescript
// ❌ WRONG - Only checks filename like "7-get-window-pos.ts"
if (cfg.excludeFiles.includes(entry.name)) {
    continue;
}
```

This meant:
- ✅ Would work: `"excludeFiles": ["7-get-window-pos.ts"]` (just filename)
- ❌ Would fail: `"excludeFiles": ["src/.../7-get-window-pos.ts"]` (full path)

Since the config had the full path, it wasn't matching.

## Solution

Created a new `isFileExcluded()` function that checks **both** full path and filename:

```typescript
// Normalize excluded files for comparison
const normalizedExcludeFiles = cfg.excludeFiles.map(p => 
    path.normalize(p).replace(/\\/g, '/')
);

function isFileExcluded(fullPath: string): boolean {
    const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
    
    // Check against exact file paths (e.g., "src/path/to/file.ts")
    if (normalizedExcludeFiles.includes(relativePath)) {
        return true;
    }

    // Also check just the filename for convenience (e.g., "file.ts")
    const filename = path.basename(fullPath);
    if (cfg.excludeFiles.includes(filename)) {
        return true;
    }

    return false;
}
```

Then use it in the scanning loop:

```typescript
// Skip excluded files by path or filename
if (isFileExcluded(fullPath)) {
    continue;
}
```

## Features

The fix now supports **two ways** to specify excluded files:

### 1. Full Path (Recommended)
```json
{
  "excludeFiles": [
    "src/shell/xternal-to-renderer/7-napi-calls/7-get-window-pos.ts"
  ]
}
```
✅ Excludes only this specific file

### 2. Filename Only (Convenience)
```json
{
  "excludeFiles": [
    "7-get-window-pos.ts"
  ]
}
```
✅ Excludes any file named `7-get-window-pos.ts` anywhere in the project

## Test Results

### Before Fix
```
✅ Extracted 397 strings from 162 files
```

**Output included:**
```json
{
  "file:///.../7-get-window-pos.ts": {
    "status": "{\"status\":"
  }
}
```
❌ File was NOT excluded

### After Fix
```
✅ Extracted 394 strings from 161 files
```

**Output:**
```
No matches found for "7-get-window-pos.ts"
```
✅ File is properly excluded (-1 file, -3 strings)

## Verification

Running `pnpm i18n:ast` now shows:
```
� Loaded configuration from scripts/i18n-ast/extract-i18n-config.json
� Extracting localization strings (AST-based)...
   Excluding files: src/shell/xternal-to-renderer/7-napi-calls/7-get-window-pos.ts
   ✅ File is properly excluded
```

## Usage Examples

### Exclude Specific Files by Path
```json
{
  "excludeFiles": [
    "src/generated/types.ts",
    "src/legacy/old-code.ts",
    "src/test/fixtures/data.ts"
  ]
}
```

### Exclude by Filename (All Instances)
```json
{
  "excludeFiles": [
    "constants.ts",
    "types.ts",
    "index.ts"
  ]
}
```

### Mix Both Approaches
```json
{
  "excludeFiles": [
    "src/specific/file.ts",        // Only this specific file
    "generated.ts"                  // Any file named "generated.ts"
  ]
}
```

## Files Changed

- `scripts/i18n-ast/4-scan-process.ts`
  - Added `normalizedExcludeFiles` array
  - Added `isFileExcluded()` function
  - Updated file exclusion logic to use `isFileExcluded()`

## Related Options

The tool now has three ways to exclude files:

1. **`excludeFiles`** - Exact file paths or filenames
2. **`excludePaths`** - Entire directories
3. **`excludePattern`** - Regex pattern (e.g., `\.(test|spec)\.`)

All three work together:

```json
{
  "excludeFiles": ["src/legacy/old.ts"],
  "excludePaths": ["src/generated"],
  "excludePattern": "\\.(test|spec)\\."
}
```

## No Regressions

✅ Path normalization works on Windows and Unix  
✅ Both filename and full path matching work  
✅ Existing excludePaths and excludePattern still work  
✅ No TypeScript errors  
✅ Output file counts match expectations  
