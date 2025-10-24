# AST-Based i18n String Extraction Utility

A TypeScript utility that extracts localizable strings from TypeScript, JavaScript, and React/JSX files using **Abstract Syntax Tree (AST)** parsing for accurate and reliable extraction.

## Features

✅ **AST-Based Parsing** - Uses TypeScript's compiler API for accurate code analysis  
✅ **TypeScript & JavaScript** - Supports `.ts`, `.tsx`, `.js`, `.jsx` files  
✅ **React/JSX Support** - Extracts JSX text content with placeholders  
✅ **Smart Filtering** - Automatically excludes technical strings:
  - Import/export paths
  - Console statements (log, warn, error, debug, info)
  - CSS class names and Tailwind classes
  - className function calls (classNames, cn, clsx, etc.)
  - querySelector/querySelectorAll CSS selectors
  - Translation function arguments (t(), dt())
  - Functions with excluded prefixes (e.g., printXxx, traceXxx)
  - Single-word camelCase identifiers
  - GUIDs/UUIDs
  - URLs and file paths
  - SVG path data
  - JavaScript directives
  - Numbers and symbols only

✅ **Template Literal Support** - Extracts template strings with `${variable}` placeholders  
✅ **Ternary Operator Extraction** - Extracts strings from ternaries: `` `${cond ? 'text' : 'pass'}` ``  
✅ **Smart Placeholder Filtering** - Skips placeholder-only (`` `${id}` ``) and separator-only (`` `${x}-${y}` ``) templates  
✅ **Placeholder Preservation** - Keeps i18n placeholders like `{variable}` and `${variable}` in extracted strings  
✅ **Clickable File URLs** - Generates `file://` URLs for easy navigation in VS Code  
✅ **Configurable** - Via config file or CLI arguments  
✅ **No External Parser Dependencies** - Uses TypeScript's built-in compiler API

## Documentation

- 📖 [Quick Start Guide](docs/QUICKSTART.md) - Get started in 5 minutes
- 🔍 [Comparison with Regex Tool](docs/COMPARISON.md) - Which tool to use?
- 📝 [Changelog](docs/CHANGELOG.md) - Version history
- 🐛 [Bug Fixes & Enhancements](docs/FIXES-SUMMARY.md) - Recent improvements
- 🎨 [Feature: Template Literals](docs/FEATURE-TEMPLATE-LITERALS.md) - Extract `` `text ${var}` `` strings
- 🎨 [Feature: className Functions](docs/FEATURE-CLASSNAME-FUNCTIONS.md) - Filter CSS classes
- 🔧 [Enhancement: JSON5 Config](docs/ENHANCEMENT-JSON5-SUPPORT.md) - Config with comments
- 🔧 [Enhancement: className Suffix](docs/ENHANCEMENT-CLASSNAME-SUFFIX.md) - Improved filtering
- 🔧 [Enhancement: Placeholder Filter](docs/ENHANCEMENT-TEMPLATE-PLACEHOLDER-FILTER.md) - Skip `` `${var}` `` and `` `${x}-${y}` `` templates
- 🔧 [Enhancement: Ternary Extraction](docs/ENHANCEMENT-TEMPLATE-TERNARY-EXTRACTION.md) - Extract `` `${cond ? 'a' : 'b'}` `` strings
- 🔧 [Enhancement: querySelector Filter](docs/ENHANCEMENT-QUERYSELECTOR-FILTER.md) - Filter CSS selectors

## Installation

No installation required! Just use `npx tsx` to run the script directly.

## Usage

### Basic Usage

```bash
npx tsx scripts/i18n-ast/extract-i18n-ast.ts
```

This will:
- Scan the `./src` directory
- Extract strings 10+ characters long
- Save results to `./scripts/i18n-strings.json`

### CLI Options

```bash
npx tsx scripts/i18n-ast/0-main.ts [options]

Options:
  --config <path>, -c                 Custom configuration file path (default: extract-i18n-config.json)
  --src <path>                        Source directory to scan (default: ./src)
  --output <path>                     Output JSON file path (default: ./scripts/i18n-strings.json)
  --min-length <number>               Minimum string length to extract (default: 10)
  --exclude <files>                   Comma-separated list of filenames to exclude
  --exclude-paths <paths>             Comma-separated list of paths to exclude
  --exclude-pattern <regex>           Regular expression pattern to exclude files
  --classname-suffix <str>            Suffix for className variable names (default: Classes)
  --classname-functions <names>       Comma-separated className function names (default: classNames,cn)
  --exclude-function-prefixes <names> Comma-separated function name prefixes to exclude (default: print,trace)
  --verbose, -v                       Show detailed configuration and file information
  --help, -h                          Show help message
```

### Examples

**Custom source and output:**
```bash
npx tsx scripts/i18n-ast/0-main.ts --src ./app --output ./i18n/strings.json
```

**Use custom config file:**
```bash
npx tsx scripts/i18n-ast/0-main.ts --config my-i18n-config.json
npx tsx scripts/i18n-ast/0-main.ts -c my-i18n-config.json
```

**Exclude test files:**
```bash
npx tsx scripts/i18n-ast/0-main.ts --exclude-pattern "\\.test\\."
```

**Set minimum string length:**
```bash
npx tsx scripts/i18n-ast/0-main.ts --min-length 5
```

**Exclude specific paths:**
```bash
npx tsx scripts/i18n-ast/0-main.ts --exclude-paths "src/tests,src/__tests__"
```

**Custom className function names:**
```bash
# Filter strings in clsx() and classnames() calls
npx tsx scripts/i18n-ast/0-main.ts --classname-functions "clsx,classnames"

# Filter strings in cn() and twMerge() calls
npx tsx scripts/i18n-ast/0-main.ts --classname-functions "cn,twMerge"
```

**Exclude functions by prefix:**
```bash
# Don't scan strings inside functions starting with "print" or "trace"
npx tsx scripts/i18n-ast/0-main.ts --exclude-function-prefixes "print,trace"

# Exclude debug and log functions
npx tsx scripts/i18n-ast/0-main.ts --exclude-function-prefixes "debug,log,dump"
```

**Show detailed output (verbose mode):**
```bash
# Show configuration details, excluded files, and paths
npx tsx scripts/i18n-ast/0-main.ts --verbose
npx tsx scripts/i18n-ast/0-main.ts -v
```

## Configuration File

Create `extract-i18n-config.json` in your project root:

```json
{
  "srcDir": "./src",
  "outputFile": "./scripts/i18n-strings.json",
  "minStringLength": 10,
  "extensions": [".ts", ".tsx", ".js", ".jsx"],
  "excludeFiles": ["test.ts", "spec.ts"],
  "excludePaths": ["src/tests", "src/__tests__"],
  "excludePattern": "\\.test\\.",
  "classNameSuffix": "Classes",
  "classNameFunctions": ["classNames", "cn"],
  "excludeFunctionPrefixes": ["print", "trace"]
}
```

**Or use JSON5 format with comments:**

```json5
{
  // Source directory to scan
  srcDir: "./src",
  
  // Output file for extracted strings
  outputFile: "./scripts/i18n-strings.json",
  
  minStringLength: 10,
  extensions: [".ts", ".tsx", ".js", ".jsx"],
  
  // Specific files to exclude (full path or filename)
  excludeFiles: [
    "src/path/to/file.ts",
    "constants.ts",
  ],
  
  // Directories to exclude
  excludePaths: [
    "src/tests",
    "src/__tests__",
  ],
  
  // Regex pattern to exclude files
  excludePattern: "\\.test\\.",
  
  classNameSuffix: "Classes",
  classNameFunctions: ["classNames", "cn"],
  
  // Function name prefixes to exclude from scanning
  // Strings inside functions like printNames(), traceData(), etc. will be skipped
  excludeFunctionPrefixes: ["print", "trace"],
}
```**Note:** CLI arguments override configuration file settings.

## Output Format

The tool generates a JSON file with clickable file URLs as keys:

```json
{
  "file:///C:/path/to/project/src/components/Button.tsx": {
    "clickMe": "Click me!",
    "helloWorld": "Hello, World!",
    "welcomeUser": "Welcome, {username}!"
  },
  "file:///C:/path/to/project/src/components/Dialog.tsx": {
    "confirmDelete": "Are you sure you want to delete {itemName}?",
    "cancel": "Cancel",
    "confirm": "Confirm"
  }
}
```

### Clickable URLs

In VS Code, you can **Ctrl+Click** (or **Cmd+Click** on Mac) on any `file://` URL to open that file directly.

## How It Works

### 1. AST Parsing

The utility uses TypeScript's compiler API (`ts.createSourceFile`) to parse source code into an Abstract Syntax Tree. This provides accurate understanding of code structure.

### 2. String Extraction

The AST visitor:
- Finds `StringLiteral` nodes for quoted strings
- Finds `JsxText` nodes for JSX content
- Reconstructs JSX text with placeholders (e.g., `Text with {variable}`)

### 3. Context-Aware Filtering

Each string is validated against its AST context:
- **Import/Export detection** - Walks up the AST to check parent nodes
- **Console statement detection** - Identifies console.log/warn/error calls
- **className detection** - Checks JSX attributes and variable names
- **Technical string patterns** - Regex-based filtering for GUIDs, URLs, etc.

### 4. Key Generation

Converts strings to camelCase keys:
- `"Hello, World!"` → `helloWorld`
- `"Click the button"` → `clickTheButton`
- Maximum 5 words per key

## Architecture

The utility is split into modular files:

```
scripts/i18n-ast/
├── extract-i18n-ast.ts    # Main entry point & CLI argument parsing
├── 1-config.ts             # Configuration interface and defaults
├── 2-help.ts               # Help message
├── 3-ast-parser.ts         # AST parsing and string extraction
├── 4-scan-process.ts       # Directory scanning and file processing
└── README.md               # This file
```

### File Descriptions

**`extract-i18n-ast.ts`**  
Main entry point. Handles CLI argument parsing, config file loading, and orchestrates the extraction process.

**`1-config.ts`**  
TypeScript interface for configuration and default values.

**`2-help.ts`**  
Contains the help message displayed with `--help` flag.

**`3-ast-parser.ts`**  
Core AST parsing logic using TypeScript compiler API. Contains:
- `extractStringsFromAST()` - Main extraction function
- Filter functions for technical strings
- JSX text reconstruction
- Key generation

**`4-scan-process.ts`**  
Directory scanning and file processing. Handles:
- Recursive directory traversal
- Path exclusion logic
- File reading and AST parsing invocation
- Result aggregation

## Comparison with Regex-Based Tool

| Feature | AST-Based (`i18n-ast`) | Regex-Based (`extract-i18n`) |
|---------|------------------------|-------------------------------|
| Parsing Method | TypeScript Compiler API | Regular Expressions |
| Accuracy | High - understands code structure | Medium - pattern matching |
| Import Detection | AST parent node traversal | Regex removal |
| Console Detection | AST call expression analysis | Regex removal |
| JSX Support | Native JSX node handling | Custom regex patterns |
| Performance | Slightly slower (parsing overhead) | Faster (direct regex) |
| Maintainability | Easier - structured code | Harder - complex regex |
| Dependencies | TypeScript (likely already installed) | None |

## Advantages of AST Approach

1. **Accuracy** - Understands code structure, not just patterns
2. **Context-Aware** - Knows if a string is in an import, console call, etc.
3. **Future-Proof** - Handles new syntax via TypeScript updates
4. **Maintainable** - Clearer logic than complex regex patterns
5. **Type-Safe** - TypeScript compiler provides type information

## Extracted String Examples

### String Literals
```tsx
const message = "Hello, World!";  // ✅ Extracted
import { Button } from "./Button";  // ❌ Filtered (import)
console.log("Debug info");  // ❌ Filtered (console)
```

### JSX Text
```tsx
<div>Welcome to our app!</div>  // ✅ Extracted
<div className="text-lg">Text</div>  // ✅ Extracted (className filtered separately)
<div>Item {index} of {total}</div>  // ✅ Extracted as "Item {index} of {total}"
```

### Technical Strings (Filtered)
```tsx
const guid = "{c0f864c8-7bbb-422e-98a3-e033d7360c97}";  // ❌ GUID
const url = "https://example.com";  // ❌ URL
const path = "./components/Button";  // ❌ Path
const classes = "flex items-center gap-2";  // ❌ CSS classes
```

### className Function Calls (Filtered)
```tsx
// Filtered by default (classNames and cn)
<div className={cn("text-lg", "font-bold")}>Text</div>  // ❌ Strings filtered
<div className={classNames("flex", "gap-2")}>Content</div>  // ❌ Strings filtered

// Can be customized via --classname-functions
<div className={clsx("rounded", "border")}>Box</div>  // ✅/❌ Depends on config
<div className={twMerge("p-4", "m-2")}>Box</div>  // ✅/❌ Depends on config
```

### Functions with Excluded Prefixes (Filtered)
```tsx
// Strings inside these functions are skipped (default prefixes: "print", "trace")
function printNames(names: string[]) {
  console.log("User names:");  // ❌ Filtered (inside printXxx function)
  names.forEach(name => console.log(name));
}

function traceData(data: any) {
  console.log("Debug data:", data);  // ❌ Filtered (inside traceXxx function)
}

const printReport = () => {
  return "Report generated";  // ❌ Filtered (inside printXxx function)
};

// Regular functions are still scanned
function displayMessage() {
  return "Hello, World!";  // ✅ Extracted (not excluded prefix)
}
```

## Troubleshooting

### No strings extracted

Check that:
- Source directory exists and contains `.ts`/`.tsx`/`.js`/`.jsx` files
- Minimum string length isn't too high
- Files aren't excluded by patterns

### Too many technical strings

Adjust filters in `3-ast-parser.ts`:
- Modify `isCodeString()` to catch more patterns
- Add custom filter functions
- Increase `minStringLength`

### Missing JSX placeholders

The tool preserves `{variable}` syntax in JSX text. For template literals with `${variable}`, those are filtered out as they're not plain strings.

## Debugging

VS Code launch configurations are included for debugging the extraction process:

### Available Debug Configurations

1. **Debug i18n-ast extraction** - Run with default settings
2. **Debug i18n-ast extraction (custom config)** - Run with custom config file
3. **Debug i18n-ast extraction (test output)** - Run with test output and lower min-length

### How to Debug

1. Open VS Code
2. Press `F5` or go to Run and Debug panel
3. Select one of the "Debug i18n-ast" configurations
4. Set breakpoints in the code (e.g., in `3-ast-parser.ts`)
5. Run the debugger

The debugger will stop at breakpoints, allowing you to:
- Inspect AST nodes
- Check filter logic
- See extracted strings in real-time
- Step through the extraction process

### Debug Tips

- Set breakpoints in `3-ast-parser.ts` in the `visit()` function to see each node
- Add breakpoints in filter functions to understand why strings are excluded
- Use the Debug Console to evaluate expressions like `node.kind` or `ts.SyntaxKind[node.kind]`

## Contributing

To modify the extraction logic:

1. **Add new filters** - Add functions in `3-ast-parser.ts`
2. **Change AST traversal** - Modify the `visit()` function
3. **Adjust JSX handling** - Update `reconstructJSXText()`
4. **Add CLI options** - Update `0-main.ts` and `2-help.ts`

## License

Same as the main project.

## See Also

- [Quick Start Guide](docs/QUICKSTART.md) - Get started quickly
- [Comparison with Regex Tool](docs/COMPARISON.md) - Detailed comparison of both approaches
- [Changelog](docs/CHANGELOG.md) - Version history and changes
- [Bug Fixes](docs/FIXES-SUMMARY.md) - Summary of all bug fixes
- [Feature Documentation](docs/FEATURE-CLASSNAME-FUNCTIONS.md) - className function filtering
- [Regex-based extraction tool](../extract-i18n/README.md) - Alternative approach
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) - Official documentation
