import * as fs from 'fs';
import * as path from 'path';
import { type Config, defaultConfig } from './7-types-config';
import { extractStringsFromAST } from './2-ast-parser';
import { type LocalizationStrings, type ResultOfScan } from './9-types';

/**
 * Scan directory and extract i18n strings using AST parsing.
 */
export function scanAndExtract(config: Partial<Config> = {}): ResultOfScan {
    const cfg = { ...defaultConfig, ...config };
    const results: LocalizationStrings = {};
    let totalOfAllFiles = 0;
    let totalOfFilesWithStrings = 0;

    // Compile exclude pattern regex if provided
    const excludeRegex = cfg.excludePattern ? new RegExp(cfg.excludePattern) : null;

    // Normalize excluded paths for comparison
    const normalizedExcludePaths = cfg.excludePaths.map(p => path.normalize(p).replace(/\\/g, '/'));

    // Normalize excluded files for comparison
    const normalizedExcludeFiles = cfg.excludeFiles.map(p => path.normalize(p).replace(/\\/g, '/'));

    function isPathExcluded(fullPath: string): boolean {
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        
        return normalizedExcludePaths.some(excludePath => {
            return relativePath === excludePath || relativePath.startsWith(excludePath + '/');
        });
    }

    function isFileExcluded(fullPath: string): boolean {
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        
        // Check against exact file paths
        if (normalizedExcludeFiles.includes(relativePath)) {
            return true;
        }

        // Also check just the filename for convenience
        const filename = path.basename(fullPath);
        if (cfg.excludeFiles.includes(filename)) {
            return true;
        }

        return false;
    }

    function scanDirectory(dir: string): void {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            // Skip excluded paths
            if (isPathExcluded(fullPath)) {
                continue;
            }

            if (entry.isDirectory()) {
                if (entry.name === 'node_modules' || entry.name === '.git') {
                    continue;
                }
                scanDirectory(fullPath);
            } else if (entry.isFile() && cfg.extensions.some(ext => entry.name.endsWith(ext))) {
                totalOfAllFiles++;
                
                // Skip excluded files by path or filename
                if (isFileExcluded(fullPath)) {
                    continue;
                }
                // Skip excluded files by regex pattern
                if (excludeRegex && excludeRegex.test(entry.name)) {
                    continue;
                }

                try {
                    const sourceCode = fs.readFileSync(fullPath, 'utf-8');
                    const strings = extractStringsFromAST(
                        fullPath,
                        sourceCode,
                        cfg.minStringLength,
                        cfg.classNameSuffix,
                        cfg.classNameFunctions,
                        cfg.excludeFunctionPrefixes,
                        cfg.excludeAttributeSuffixPattern
                    );

                    if (Object.keys(strings).length > 0) {
                        totalOfFilesWithStrings++;
                        // Create file:// URL with absolute path
                        const absolutePath = path.resolve(fullPath).replace(/\\/g, '/');
                        const fileUrl = 'file:///' + absolutePath;
                        results[fileUrl] = strings;
                    }
                } catch (error) {
                    console.warn(`⚠️  Failed to process ${fullPath}:`, error instanceof Error ? error.message : error);
                }
            }
        }
    }

    scanDirectory(path.resolve(cfg.srcDir));
    
    return {
        totalOfAllFiles,
        totalOfFilesWithStrings,
        strings: results
    };
}
