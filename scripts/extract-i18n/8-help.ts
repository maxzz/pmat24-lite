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
  --output <path>      Output JSON file path (default: ./scripts/i18n-strings.json)
  --min-length <num>   Minimum string length to extract (default: 10)
  --exclude <files>    Comma-separated list of filenames to exclude (e.g., types.ts,constants.ts)
  --exclude-pattern <regex>  Regex pattern to exclude filenames (e.g., "\.test\\.tsx?$" or "mock|test")
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

  # Exclude files matching regex pattern (test files)
  pnpm i18n:extract --exclude-pattern "\\.test\\.tsx?$"

  # Exclude files containing "mock" or "test" in filename
  pnpm i18n:extract --exclude-pattern "mock|test"

  # Combine both exclusion methods
  pnpm i18n:extract --exclude types.ts --exclude-pattern "\\.spec\\."

Config File (extract-i18n-config.json):
  {
    "srcDir": "./src/renderer",
    "outputFile": "./i18n/strings.json",
    "minStringLength": 5,
    "excludeFiles": ["types.ts", "constants.ts"],
    "excludePaths": ["src/tests", "src/mocks", "src/utils/test-helpers.ts"],
    "excludePattern": "\\\\.(test|spec)\\\\."
  }

  Note: CLI arguments override config file settings
`);
}
