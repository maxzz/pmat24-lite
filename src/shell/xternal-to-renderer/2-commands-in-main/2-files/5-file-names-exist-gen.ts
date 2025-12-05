import path from "path";
import fs from "fs";
import { errorToString } from "@shell/3-utils-main";

/**
 * Check if file from renderer exists in the main process.
 * @param fileName - file name with path
 */
export async function existsFileInMain(fileName: string): Promise<{ exists: boolean; error: string; }> { // call 'r2mi:file-exists' in main
    try {
        if (!fs.existsSync(fileName)) {
            return {
                exists: false,
                error: '',
            };
        }

        const stats = await fs.promises.stat(fileName);
        if (stats.isDirectory()) {
            return {
                exists: true,
                error: 'This is a directory',
            };
        }

        return {
            exists: true,
            error: '',
        };
    } catch (error) {
        return {
            exists: false,
            error: errorToString(error),
        };
    }
}

/**
 * Generate unique filename from file name pattern.
 * @param fileName - file name with path
 */
export async function generateUniqueFilename(fileNamePattern: string): Promise<{ newFilename: string; error: string; }> { // call 'r2mi:get-unique-filename' in main
    try {
        const fext = path.extname(fileNamePattern);
        const fname = path.basename(fileNamePattern, fext);

        let newFname = makeUniqueName(fname);
        let attempts = 0;

        while (true) {
            const resName = path.join(path.dirname(fileNamePattern), newFname + fext);

            const stats = await fs.promises.stat(resName);

            if (!stats.isFile()) {
                return {
                    newFilename: resName,
                    error: '',
                };
            }

            if (attempts++ > 50) {
                return {
                    newFilename: '',
                    error: 'Cannot generate unique filename',
                };
            }
            newFname = makeUniqueName(fname);
        }
    } catch (error) {
        return {
            newFilename: '',
            error: errorToString(error),
        };
    }
}

// Utils

function getEndingNumber(str: string | undefined): number | undefined {
    const match = str?.match(/\d+$/);
    return match ? parseInt(match[0]) : undefined;
}

/**
 * From name with pattern like "name-123.ext" extract name and ending number.
 */
function getNameFromPattern(str: string | undefined): { starting: string; ending: number | undefined; } {
    const ending = getEndingNumber(str);
    const starting = str?.replace(/\s*-?\s*\d+$/, '') || '';
    return { starting, ending };
}

/**
 * From name with pattern like "name-123.ext" generate unique name with ending number like "name-124.ext".
 */
function makeUniqueName(name: string): string {
    const { starting, ending } = getNameFromPattern(name);
    if (ending) {
        return `${starting}-${ending + 1}`;
    }
    return starting;
}
