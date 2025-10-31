# Quick Start Guide - AST-Based i18n Extraction

## Installation
None required! Uses existing TypeScript dependency.

## Basic Usage

```bash
# Extract untranslated strings (default scan mode)
npx tsx scripts/i18n-ast/0-main.ts

# Collect already-translated strings from t() and dt() calls
npx tsx scripts/i18n-ast/0-main.ts --mode translated
npx tsx scripts/i18n-ast/0-main.ts -m translated

# Extract to custom file
npx tsx scripts/i18n-ast/0-main.ts --output ./my-strings.json

# Use custom config file
npx tsx scripts/i18n-ast/0-main.ts --config my-config.json
npx tsx scripts/i18n-ast/0-main.ts -c my-config.json

# See all options
npx tsx scripts/i18n-ast/0-main.ts --help
```

## Operation Modes

**Scan Mode (default)**: Extracts untranslated strings that need localization  
**Translated Mode**: Collects strings from `t()` and `dt()` function calls

Both modes share the same source directory and file exclusion settings.

## Files Structure

```
scripts/i18n-ast/
├── 0-main.ts               # Main entry point - run this
├── 1-config.ts             # Configuration types
├── 2-help.ts               # Help message
├── 3-ast-parser.ts         # AST parsing logic
├── 4-scan-process.ts       # Directory scanning
├── README.md               # Full documentation
├── QUICKSTART.md           # This file
└── COMPARISON.md           # AST vs Regex comparison
```

## What Gets Extracted

✅ String literals: `"Hello, World!"`  
✅ JSX text: `<div>Welcome!</div>`  
✅ JSX with placeholders: `<div>User {name} logged in</div>`

## What Gets Filtered

❌ Imports: `import "./file"`  
❌ Console: `console.log("debug")`  
❌ CSS classes: `className="flex gap-2"`  
❌ GUIDs: `"{abc-123-def}"`  
❌ URLs: `"https://example.com"`

## Output Format

```json
{
  "file:///C:/path/to/file.tsx": {
    "welcomeMessage": "Welcome to our app!",
    "userGreeting": "Hello {username}!"
  }
}
```

Click the `file://` URLs in VS Code to open files!

## Debugging in VS Code

Use the built-in debug configurations:

1. Press `F5` or open Run and Debug panel
2. Select a debug configuration:
   - **Debug i18n-ast extraction** - Default settings
   - **Debug i18n-ast extraction (custom config)** - With config file
   - **Debug i18n-ast extraction (test output)** - Test mode
3. Set breakpoints in `3-ast-parser.ts` to inspect the AST
4. Step through the code to understand the extraction process

## See Also

- [Full README](./README.md) - Complete documentation
- [Comparison](./COMPARISON.md) - AST vs Regex-based tool
- [Config Example](../../extract-i18n-config.example.json) - Configuration file example
