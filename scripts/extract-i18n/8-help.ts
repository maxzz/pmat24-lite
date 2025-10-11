export function help() {
    console.log(`
📝 Extract i18n Strings - Localization String Extractor

Usage:
  npx tsx scripts/extract-i18n-strings.ts [options]
  pnpm i18n:extract [options]

Options:
  --src <path>         Source directory to scan (default: ./src)
  --output <path>      Output JSON file path (default: ./scripts/i18n-strings.json)
  --min-length <num>   Minimum string length to extract (default: 10)
  --help               Show this help message

Examples:
  # Extract with defaults
  pnpm i18n:extract

  # Custom source and output
  pnpm i18n:extract --src ./src/renderer --output ./i18n/strings.json

  # Extract shorter strings
  pnpm i18n:extract --min-length 5
`);
}
