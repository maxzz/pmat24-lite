import fs from "fs";
import path from "path";
import { type R2MInvoke } from "@shared/ipc-types";
import { errorToString } from "@shell/3-utils-main";

/**
 * Save file from renderer in the main process.
 * @param fileName - file name with path
 * @param content - file content
 * @returns - error message or empty string
 */
export async function saveFileInMain(fileName: string, content: string): Promise<R2MInvoke.EmptyOkOrError> { // call 'r2mi:save-file' in main

    // 1. Create dir if needed

    const fileDir = path.dirname(fileName || '');
    if (!fileDir || fileDir === '.') {
        return `save wo/ dir`;
    }

    if (fileDir.length > 254) { // Windows max path length check
        return `The filename "${fileName}" is too long (${fileName.length})`;
    }

    // 2. Write file

    try {
        if (!fs.existsSync(fileDir)) {
            await fs.promises.mkdir(fileDir, { recursive: true });
        }

        await fs.promises.writeFile(fileName, content);
        return '';
    } catch (error) {
        return errorToString(error);
    }
}
