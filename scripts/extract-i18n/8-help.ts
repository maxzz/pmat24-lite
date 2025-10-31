export function help() {
    console.log(`
📝 Extract i18n Strings - Localization String Extractor

Usage:
  npx tsx scripts/extract-i18n-strings.ts [options]
  pnpm i18n:extract [options]

Configuration:
  The tool will automatically load settings from extract-i18n-config.json if it exists
  in the current directory. CLI options override config file settings.

Options:
  --src <path>         Source directory to scan (default: ./src)
  --output <path>      Output JSON file path (default: ./scripts/i18n-ast-strings.json)
  --min-length <num>   Minimum string length to extract (default: 10)
  --exclude <files>    Comma-separated list of filenames to exclude (e.g., types.ts,constants.ts)
  --exclude-paths <paths>  Comma-separated list of file/folder paths to exclude (e.g., src/tests,src/mocks/data.ts)
  --exclude-pattern <regex>  Regex pattern to exclude filenames (e.g., "\\.test\\.tsx?$" or "mock|test")
  --classname-suffix <suffix>  Suffix for CSS class variable names to exclude (default: Classes)
  --help               Show this help message

Examples:
  # Extract with defaults
  pnpm i18n:extract

  # Custom source and output
  pnpm i18n:extract --src ./src/renderer --output ./i18n/strings.json

  # Extract shorter strings
  pnpm i18n:extract --min-length 5

  # Exclude specific files
  pnpm i18n:extract --exclude types.ts,constants.ts,config.ts

  # Exclude entire folders or specific file paths
  pnpm i18n:extract --exclude-paths src/tests,src/mocks,src/components/temp.tsx

  # Exclude files matching regex pattern (test files)
  pnpm i18n:extract --exclude-pattern "\\.test\\.tsx?$"

  # Exclude files containing "mock" or "test" in filename
  pnpm i18n:extract --exclude-pattern "mock|test"

  # Custom className suffix for CSS variables
  pnpm i18n:extract --classname-suffix Styles

  # Combine all exclusion methods
  pnpm i18n:extract --exclude types.ts --exclude-paths src/tests --exclude-pattern "\\.spec\\."

Config File (extract-i18n-config.json):
  {
    "srcDir": "./src/renderer",
    "outputFile": "./i18n/strings.json",
    "minStringLength": 5,
    "excludeFiles": ["types.ts", "constants.ts"],
    "excludePaths": ["src/tests", "src/mocks", "src/utils/test-helpers.ts"],
    "excludePattern": "\\\\.(test|spec)\\\\.",
    "classNameSuffix": "Classes"
  }

  Note: CLI arguments override config file settings
`);
}
