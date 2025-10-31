import * as fs from "fs";
import * as path from "path";
import { type Config, defaultConfig } from "./9-config";
import { extractStringsFromFile } from "./3-extract-strings";

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
                const strings = extractStringsFromFile(fullPath, cfg.minStringLength, cfg.classNameSuffix);
                if (Object.keys(strings).length > 0) {
                    // Use absolute file:// URL for clickable links in VS Code
                    // Format: file:///C:/absolute/path/to/file.ts
                    const absolutePath = path.resolve(fullPath).replace(/\\/g, '/');
                    const fileUrl = 'file:///' + absolutePath;
                    results[fileUrl] = strings;
                }
            
            }
        }
    }

    scanDirectory(path.resolve(cfg.srcDir));
    return results;
}
