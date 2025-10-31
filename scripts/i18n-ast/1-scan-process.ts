import * as fs from "fs";
import * as path from "path";
import { type Config } from "./7-config-types";
import { extractStringsFromAST } from "./2-ast-parser";
import { type LocalizationStrings, type ResultOfScan } from "./9-types";

/**
 * Scan directory and extract i18n strings using AST parsing.
 */
export function scanAndExtract(config: Config): ResultOfScan {
    const rv: ResultOfScan = {
        totalOfAllFiles: 0,
        totalOfFilesWithStrings: 0,
        strings: {},
        translatedStrings: {},
    };

    // Normalize excluded paths for comparison
    const normalizedExcludePaths = config.excludePaths.map(p => path.normalize(p).replace(/\\/g, '/'));

    function isPathExcluded(fullPath: string): boolean {
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        return normalizedExcludePaths.some(
            (excludePath) => {
                return relativePath === excludePath || relativePath.startsWith(excludePath + '/');
            }
        );
    }

    // Normalize excluded files for comparison
    const normalizedExcludeFiles = config.excludeFiles.map(p => path.normalize(p).replace(/\\/g, '/'));

    function isFileExcluded(fullPath: string): boolean {
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');

        // Check against exact file paths
        if (normalizedExcludeFiles.includes(relativePath)) {
            return true;
        }

        // Also check just the filename for convenience
        const filename = path.basename(fullPath);
        if (config.excludeFiles.includes(filename)) {
            return true;
        }

        return false;
    }

    // Compile exclude pattern regex if provided
    const excludeRegex = config.excludePattern ? new RegExp(config.excludePattern) : null;

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
            }
            else if (entry.isFile()) {
                rv.totalOfAllFiles++;

                // Skip excluded files by path or filename
                if (isFileExcluded(fullPath)) {
                    continue;
                }

                // Skip excluded files by regex pattern
                if (excludeRegex && excludeRegex.test(entry.name)) {
                    continue;
                }

                // Skip files by filename extension
                if (!config.extensions.some(ext => entry.name.endsWith(ext))) {
                    continue;
                }

                try {
                    const sourceCode = fs.readFileSync(fullPath, 'utf-8');

                    const mod: "scan" | "translated" = "scan"; // TODO: implement as CLI option

                    if (mod === "scan") {
                        const strings = extractStringsFromAST(fullPath, sourceCode, config);

                        if (Object.keys(strings).length > 0) {
                            rv.totalOfFilesWithStrings++;
                            // Create file:// URL with absolute path
                            const absolutePath = path.resolve(fullPath).replace(/\\/g, '/');
                            const fileUrl = 'file:///' + absolutePath;
                            rv.strings[fileUrl] = strings;
                        }
                    }
                    else if (mod === "translated") {
                        const strings = collectTranslatedStrings(config);
                        if (Object.keys(strings).length > 0) {
                            // TODO: implement
                        }
                    }
                } catch (error) {
                    console.warn(`⚠️  Failed to process ${fullPath}:`, error instanceof Error ? error.message : error);
                }
            }
        }
    }

    scanDirectory(path.resolve(config.srcDir));

    return rv;
}

function collectTranslatedStrings(config: Partial<Config> = {}): LocalizationStrings {
    // TODO: implement
    const rv: LocalizationStrings = {};
    return rv;
}
