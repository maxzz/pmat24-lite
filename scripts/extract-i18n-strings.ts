import * as fs from 'fs';
import * as path from 'path';
import { extractI18nStrings, defaultConfig, type Config } from './scan-process';

function help() {
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

function main() {
    const args = process.argv.slice(2);

    if (args.includes('--help') || args.includes('-h')) {
        help();
        return;
    }

    const config: Partial<Config> = {};

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace(/^--/, '');
        const value = args[i + 1];

        if (key === 'src') config.srcDir = value;
        else if (key === 'output') config.outputFile = value;
        else if (key === 'min-length') config.minStringLength = parseInt(value, 10);
    }

    console.log('🔍 Extracting localization strings...');
    console.log(`   Source: ${config.srcDir || defaultConfig.srcDir}`);
    console.log(`   Output: ${config.outputFile || defaultConfig.outputFile}`);

    const results = extractI18nStrings(config);
    const totalStrings = Object.values(results).reduce((sum, obj) => sum + Object.keys(obj).length, 0);

    const outputPath = path.resolve(config.outputFile || defaultConfig.outputFile);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

    console.log(`✅ Extracted ${totalStrings} strings from ${Object.keys(results).length} files`);
    console.log(`   Saved to: ${outputPath}`);
}

// Auto-execute when run directly
main();

/*
Usage:

# Run with defaults (./src → ./scripts/i18n-strings.json)
npx tsx scripts/extract-i18n-strings.ts

# Custom options
npx tsx scripts/extract-i18n-strings.ts --src ./src/renderer --output ./i18n/strings.json --min-length 15
*/

/*
Example output (i18n-strings.json):

{
  "src/renderer/src/components/2-main/2-right/2-file-mani/2-form-options/1-in-form-options/5-9-use-is-show-example.tsx": {
    "theRegularExpressionIsEmpty": "The regular expression is empty, so the regular expression is useless.",
    "theRegularExpressionAndThe": "The regular expression and the original URL are an exact match, so the regular expression is useless.",
    "youCanDefineTheRegular": "You can define the regular expression as any part of the original URL, but the website domain will be taken from the original URL.",
    "forExampleIfTheOriginal": "For example, if the original URL is"
  }
}
*/
