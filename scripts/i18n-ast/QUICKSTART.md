# Quick Start Guide - AST-Based i18n Extraction

## Installation
None required! Uses existing TypeScript dependency.

## Basic Usage

```bash
# Extract to default location
npx tsx scripts/i18n-ast/extract-i18n-ast.ts

# Extract to custom file
npx tsx scripts/i18n-ast/extract-i18n-ast.ts --output ./my-strings.json

# See all options
npx tsx scripts/i18n-ast/extract-i18n-ast.ts --help
```

## Files Structure

```
scripts/i18n-ast/
├── extract-i18n-ast.ts    # Main entry point - run this
├── 1-config.ts             # Configuration types
├── 2-help.ts               # Help message
├── 3-ast-parser.ts         # AST parsing logic
├── 4-scan-process.ts       # Directory scanning
├── README.md               # Full documentation
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

## See Also

- [Full README](./README.md) - Complete documentation
- [Comparison](./COMPARISON.md) - AST vs Regex-based tool
- [Config Example](../../extract-i18n-config.example.json) - Configuration file example
