import * as fs from 'fs';
import * as path from 'path';
import { type Config, defaultConfig } from './9-config';

interface LocalizationStrings {
    [filename: string]: Record<string, string>;
}

/**
 * Extract user-facing strings from source files for localization.
 * Scans TypeScript/JavaScript files and extracts string literals that appear to be user-facing text.
 */
export function extractI18nStrings(config: Partial<Config> = {}): LocalizationStrings {
    const cfg = { ...defaultConfig, ...config };
    const results: LocalizationStrings = {};

    // Compile exclude pattern regex if provided
    const excludeRegex = cfg.excludePattern ? new RegExp(cfg.excludePattern) : null;

    // Normalize excluded paths for comparison
    const normalizedExcludePaths = cfg.excludePaths.map(p => 
        path.normalize(p).replace(/\\/g, '/')
    );

    function isPathExcluded(fullPath: string): boolean {
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        
        return normalizedExcludePaths.some(excludePath => {
            // Check if the relative path starts with the excluded path
            // This handles both files and folders
            return relativePath === excludePath || relativePath.startsWith(excludePath + '/');
        });
    }

    function scanDirectory(dir: string): void {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            // Skip excluded paths (files or folders)
            if (isPathExcluded(fullPath)) {
                continue;
            }

            if (entry.isDirectory()) {
                if (entry.name === 'node_modules' || entry.name === '.git') {
                    continue;
                }
                scanDirectory(fullPath);
            } else if (entry.isFile() && cfg.extensions.some(ext => entry.name.endsWith(ext))) {
                // Skip excluded files by exact filename
                if (cfg.excludeFiles.includes(entry.name)) {
                    continue;
                }
                // Skip excluded files by regex pattern
                if (excludeRegex && excludeRegex.test(entry.name)) {
                    continue;
                }
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
                isUrl(str) ||
                isOnlyNumbersOrSymbols(str) ||
                isGuid(str)
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

function isOnlyNumbersOrSymbols(str: string): boolean {
    // Skip strings that contain only numbers, symbols, or whitespace (no letters)
    return !/[a-zA-Z]/.test(str);
}

function isGuid(str: string): boolean {
    // Skip GUID/UUID strings (with or without braces/hyphens)
    // Matches patterns like: {c0f864c8-7bbb-422e-98a3-e033d7360c97} or c0f864c8-7bbb-422e-98a3-e033d7360c97
    return /^[{]?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[}]?$/i.test(str);
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
