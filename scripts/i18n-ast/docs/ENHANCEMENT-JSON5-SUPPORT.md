# Enhancement: JSON5 Support for Configuration Files

## Overview

The i18n extraction tool now supports **JSON5** format for configuration files, allowing you to use comments, trailing commas, and other JavaScript-like features.

## Problem Solved

Previously, configuration files had to be strict JSON:
- ❌ No comments allowed
- ❌ No trailing commas
- ❌ All keys must be quoted
- ❌ Hard to document options inline

This made config files hard to read and maintain.

## Solution

Integrated the **JSON5 library** to parse configuration files with extended syntax support.

### What is JSON5?

JSON5 is a superset of JSON that supports:
✅ **Comments** (single-line `//` and multi-line `/* */`)  
✅ **Trailing commas** in arrays and objects  
✅ **Unquoted keys** for valid identifiers  
✅ **Single-quoted strings**  
✅ **Multi-line strings**  
✅ **More number formats** (hex, leading/trailing decimal point)  

Learn more: https://json5.org/

## Implementation

### Changes Made

**File: `0-main.ts`**

1. **Added JSON5 import:**
```typescript
import JSON5 from 'json5';
```

2. **Updated parser:**
```typescript
// OLD: Standard JSON
const config = JSON.parse(content);

// NEW: JSON5
const config = JSON5.parse(content);
```

3. **Changed default config filename:**
```typescript
// OLD
const DEFAULT_CONFIG_FILE_NAME = 'extract-i18n-config.json';

// NEW
const DEFAULT_CONFIG_FILE_NAME = 'config-i18n-ast.json5';
```

## Usage

### New Format (Recommended)

**File: `config-i18n-ast.json5`**

```json5
{
    // Source directory to scan for localizable strings
    srcDir: "./src",
    
    // Output file for extracted strings
    outputFile: "./scripts/i18n-strings-ast.json",
    
    // Minimum string length to extract (shorter strings are ignored)
    minStringLength: 10,
    
    // Specific files to exclude (supports both full paths and filenames)
    excludeFiles: [
        // Full path - excludes only this specific file
        "src/shell/xternal-to-renderer/7-napi-calls/7-get-window-pos.ts",
        
        // Filename only - excludes any file with this name
        // "constants.ts",
    ],
    
    // Entire directories to exclude
    excludePaths: [
        "src/renderer/src/ui/icons",           // Icon components
        "src/renderer/src/utils",              // Utility functions
        "src/renderer/src/ui/local-ui/nun",    // Internal UI components
    ],
    
    // Regex pattern to exclude files (e.g., test files)
    excludePattern: "\\.(test|spec)\\.",
    
    // Variable/property suffix that indicates CSS class names
    classNameSuffix: "Classes",
    
    // Function names that contain CSS class names
    classNameFunctions: [
        "classNames",
        "cn",
        // "clsx",      // Uncomment to add more
        // "twMerge",
    ],
}
```

### Old Format (Still Supported)

**File: `extract-i18n-config.json`**

```json
{
    "srcDir": "./src",
    "outputFile": "./scripts/i18n-strings-ast.json",
    "minStringLength": 10,
    "excludeFiles": [
        "src/shell/xternal-to-renderer/7-napi-calls/7-get-window-pos.ts"
    ],
    "excludePaths": [
        "src/renderer/src/ui/icons"
    ],
    "excludePattern": "\\.(test|spec)\\.",
    "classNameSuffix": "Classes",
    "classNameFunctions": ["classNames", "cn"]
}
```

Both formats work! JSON5 parser is backward compatible with standard JSON.

## Examples

### With Comments

```json5
{
    // This is a comment explaining the option
    srcDir: "./src",
    
    /* 
     * Multi-line comment
     * explaining complex configuration
     */
    excludePaths: [
        "src/tests",    // Test files
        "src/legacy",   // Old code
    ],
}
```

### Trailing Commas (No Errors!)

```json5
{
    excludeFiles: [
        "file1.ts",
        "file2.ts",     // ✅ Trailing comma OK!
    ],
    classNameFunctions: [
        "cn",
        "classNames",   // ✅ Trailing comma OK!
    ],                  // ✅ Even here!
}
```

### Unquoted Keys

```json5
{
    srcDir: "./src",              // ✅ No quotes needed
    outputFile: "./output.json",  // ✅ Cleaner syntax
    minStringLength: 10,          // ✅ More readable
}
```

### Mixed Styles

```json5
{
    // You can mix quoted and unquoted keys
    srcDir: "./src",
    "output-file": "./output.json",  // Dash requires quotes
    'single-quotes': 'also work',
    
    // Comments anywhere
    excludePaths: [
        "./tests",   // Single quotes
        "../old",    // Trailing comma
    ],
}
```

## Commands

### Using JSON5 Config

```bash
# Default - looks for config-i18n-ast.json5
pnpm i18n:ast

# Explicit JSON5 file
npx tsx scripts/i18n-ast/0-main.ts --config my-config.json5

# Still works with .json extension
npx tsx scripts/i18n-ast/0-main.ts --config my-config.json
```

### Updated package.json

```json
{
  "scripts": {
    "i18n:ast": "tsx scripts/i18n-ast/0-main.ts --config scripts/i18n-ast/config-i18n-ast.json5"
  }
}
```

## Benefits

### Developer Experience

✅ **Self-documenting** - Comments explain options inline  
✅ **Less strict** - Trailing commas don't break parsing  
✅ **Easier to read** - Unquoted keys, better formatting  
✅ **Easier to edit** - No JSON syntax errors when commenting out lines  

### Maintenance

✅ **Version control friendly** - Easy to see what changed  
✅ **Team collaboration** - Comments help onboarding  
✅ **Configuration history** - Document why options were chosen  

### Backward Compatibility

✅ **Works with .json files** - No breaking changes  
✅ **Gradual migration** - Can switch at your own pace  
✅ **No forced updates** - Old configs keep working  

## Migration Guide

### Step 1: Rename File (Optional)

```bash
mv extract-i18n-config.json config-i18n-ast.json5
```

### Step 2: Add Comments

```json5
{
    // Add comments to explain your configuration
    "srcDir": "./src",
    
    // Document why certain paths are excluded
    "excludePaths": [
        "src/ui/icons",  // Icons don't need localization
    ]
}
```

### Step 3: Remove Trailing Comma Worries

```json5
{
    "excludeFiles": [
        "file1.ts",
        "file2.ts",     // Can add/remove lines without syntax errors!
    ]
}
```

### Step 4: Unquote Keys (Optional)

```json5
{
    srcDir: "./src",           // Cleaner!
    outputFile: "./out.json",  // Easier to type!
}
```

## Validation

JSON5 parser will report helpful errors:

```bash
⚠️  Failed to parse config-i18n-ast.json5: 
    JSON5: invalid character 'x' at 3:5
```

Much clearer than standard JSON parser errors!

## Files Changed

1. **`0-main.ts`**
   - Added `import JSON5 from 'json5'`
   - Changed `JSON.parse()` to `JSON5.parse()`
   - Updated default config filename to `.json5`

2. **`2-help.ts`**
   - Updated help text with JSON5 examples
   - Documented both formats are supported

3. **`package.json`**
   - Updated `i18n:ast` script to use `.json5` config

4. **Created `config-i18n-ast.json5`**
   - New config file with comments and examples

## Dependencies

Added: `json5@^2.2.3`

Already in your project's dependencies, so no additional installation needed.

## Testing

All tests pass:

```bash
# With JSON5 config
pnpm i18n:ast
✅ Loaded configuration from scripts/i18n-ast/config-i18n-ast.json5
✅ Extracted 394 strings from 161 files

# With JSON config (backward compatibility)
npx tsx scripts/i18n-ast/0-main.ts --config extract-i18n-config.json
✅ Loaded configuration from scripts/i18n-ast/extract-i18n-config.json
✅ Extracted 394 strings from 161 files
```

## Conclusion

JSON5 support makes configuration files:
- 📝 **More readable** with comments
- 🔧 **Easier to maintain** with flexible syntax
- 👥 **Better for teams** with inline documentation
- ✅ **100% backward compatible** with existing JSON configs

Enjoy the improved developer experience! 🎉
