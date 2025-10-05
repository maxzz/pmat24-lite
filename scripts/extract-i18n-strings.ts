import * as fs from 'fs';
import * as path from 'path';

interface LocalizationStrings {
    [filename: string]: Record<string, string>;
}

interface Config {
    srcDir: string;
    outputFile: string;
    minStringLength: number;
    extensions: string[];
}

const defaultConfig: Config = {
    srcDir: './src',
    outputFile: './scripts/i18n-strings.json',
    minStringLength: 10,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
};

/**
 * Extract user-facing strings from source files for localization.
 * Scans TypeScript/JavaScript files and extracts string literals that appear to be user-facing text.
 */
export function extractI18nStrings(config: Partial<Config> = {}): LocalizationStrings {
    const cfg = { ...defaultConfig, ...config };
    const results: LocalizationStrings = {};

    function scanDirectory(dir: string): void {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                if (entry.name === 'node_modules' || entry.name === '.git') {
                    continue;
                }
                scanDirectory(fullPath);
            } else if (entry.isFile() && cfg.extensions.some(ext => entry.name.endsWith(ext))) {
                const relativePath = path.relative(process.cwd(), fullPath);
                const strings = extractStringsFromFile(fullPath, cfg.minStringLength);
                if (Object.keys(strings).length > 0) {
                    results[relativePath.replace(/\\/g, '/')] = strings;
                }
            }
        }
    }

    scanDirectory(path.resolve(cfg.srcDir));
    return results;
}

function extractStringsFromFile(filePath: string, minLength: number): Record<string, string> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const strings: Record<string, string> = {};

    // Match string literals (single/double quotes, template literals without interpolation)
    // Exclude: imports, requires, CSS classes, short identifiers, code-like strings
    const patterns = [
        // Double quotes
        /"([^"\\]*(\\.[^"\\]*)*)"/g,
        // Single quotes
        /'([^'\\]*(\\.[^'\\]*)*)'/g,
        // Template literals without ${...}
        /`([^`$\\]*(\\.[^`$\\]*)*)`/g,
    ];

    const foundStrings = new Set<string>();

    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const str = match[1];

            // Filter out strings that are likely not user-facing
            if (
                str.length < minLength ||
                foundStrings.has(str) ||
                isCodeString(str) ||
                isCssClass(str) ||
                isImportPath(str) ||
                isUrl(str)
            ) {
                continue;
            }

            foundStrings.add(str);
            const key = generateKey(str);
            strings[key] = str;
        }
    }

    return strings;
}

function isCodeString(str: string): boolean {
    // Skip strings that look like code identifiers, paths, or technical strings
    return (
        /^[a-z_$][a-z0-9_$]*$/i.test(str) || // identifier
        /^[\w-]+\.(js|ts|tsx|jsx|json|css|scss)$/i.test(str) || // filename
        /^@\//.test(str) || // path alias
        /^\w+:/.test(str) || // protocol or CSS property
        /^#[0-9a-f]{3,8}$/i.test(str) || // color hex
        /^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/i.test(str) || // CSS unit
        /^[\w-]+\/[\w-]+/.test(str) // path-like
    );
}

function isCssClass(str: string): boolean {
    // Skip Tailwind/CSS class strings
    return (
        /^[\w-]+([\s]+[\w-]+)*$/.test(str) &&
        (
            str.includes('-') ||
            /^(flex|grid|block|inline|hidden|text|bg|border|rounded|shadow|p|m|w|h|size)/.test(str)
        )
    );
}

function isImportPath(str: string): boolean {
    return str.startsWith('./') || str.startsWith('../') || str.startsWith('@/');
}

function isUrl(str: string): boolean {
    return /^https?:\/\//.test(str);
}

function generateKey(str: string): string {
    // Generate camelCase key from string
    const words = str
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 0)
        .slice(0, 5); // max 5 words

    if (words.length === 0) {
        return 'key_' + Math.random().toString(36).substring(2, 9);
    }

    return words
        .map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
}

// CLI interface - auto-execute when run directly
const args = process.argv.slice(2);
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
