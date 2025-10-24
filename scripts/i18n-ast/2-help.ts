export function help() {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║         AST-Based i18n String Extraction Utility (TypeScript)             ║
╚═══════════════════════════════════════════════════════════════════════════╝

Extract user-facing strings from TypeScript/JavaScript/React files using AST.

USAGE:
  npx tsx scripts/i18n-ast/0-main.ts [options]

OPTIONS:
  --config <path>, -c                 Custom configuration file path (default: extract-i18n-config.json5)
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
  --help, -h                          Show this help message

CONFIGURATION FILE:
  You can create a file named 'extract-i18n-config.json5' in the project root.
  The file supports JSON5 format (comments, trailing commas, unquoted keys).

  Example (extract-i18n-config.json5):

  {
    // Source directory to scan
    srcDir: "./src",
    
    // Output file for extracted strings
    outputFile: "./scripts/i18n-strings.json",
    
    minStringLength: 10,
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    
    // Specific files to exclude (full path or filename)
    excludeFiles: [
      "src/path/to/file.ts",    // Full path
      "constants.ts",            // Just filename
    ],
    
    // Directories to exclude
    excludePaths: [
      "src/tests",
      "src/__tests__",
    ],
    
    // Regex pattern to exclude files
    excludePattern: "\\\\.test\\\\.",
    
    classNameSuffix: "Classes",
    classNameFunctions: ["classNames", "cn"],
    
    // Function name prefixes to exclude (e.g., printNames, traceData)
    excludeFunctionPrefixes: ["print", "trace"],
  }

  Both .json5 and .json formats are supported.
  CLI arguments override configuration file settings.

EXAMPLES:
  # Run with defaults
  npx tsx scripts/i18n-ast/0-main.ts

  # Use custom config file (JSON5 or JSON)
  npx tsx scripts/i18n-ast/0-main.ts --config my-config.json5
  npx tsx scripts/i18n-ast/0-main.ts -c my-config.json

  # Custom source and output
  npx tsx scripts/i18n-ast/0-main.ts --src ./app --output ./i18n/strings.json

  # Exclude test files
  npx tsx scripts/i18n-ast/0-main.ts --exclude-pattern "\\\\.test\\\\."

  # Set minimum string length
  npx tsx scripts/i18n-ast/0-main.ts --min-length 5

  # Custom className function names
  npx tsx scripts/i18n-ast/0-main.ts --classname-functions "clsx,classnames,cn"

FEATURES:
  ✓ AST-based parsing for accurate extraction
  ✓ TypeScript and JavaScript support
  ✓ React/JSX text content extraction
  ✓ Preserves i18n placeholders like {variable}
  ✓ Filters out technical strings (imports, CSS classes, etc.)
  ✓ Excludes console.log/warn/error messages
  ✓ Handles string literals and JSX text
  ✓ Generates clickable file:// URLs
  ✓ Configurable via file or CLI

OUTPUT FORMAT:
  {
    "file:///C:/path/to/file.tsx": {
      "stringKey": "String value",
      "anotherKey": "Text with {placeholder}"
    }
  }

For more information, see README.md in scripts/i18n-ast/
Additional documentation available in scripts/i18n-ast/docs/
`);
}
