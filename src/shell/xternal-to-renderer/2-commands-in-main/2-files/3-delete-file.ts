import fs from "fs";
import path from "path";
import { errorToString, toWindows } from "@shell/3-utils-main";

/**
 * Delete file (not directory) from renderer in the main process.
 * @param fileName - file name with path
 * @returns - error message or empty string
 */
export async function deleteFileInMain(fileName: string): Promise<string> { // call 'r2mi:delete-file' in main
    try {
        fileName = toWindows(fileName); // critical for Windows ntework share files
        
        if (!fs.existsSync(fileName)) {
            return '';
        }

        const stats = await fs.promises.stat(fileName);
        if (stats.isDirectory()) {
            return 'Cannot delete directory';
        }

        await fs.promises.unlink(fileName);
        return '';
    } catch (error) {
        return errorToString(error);
    }
}

// /**
//  * Probably OK but not tested abd not needed.
//  * Delete directory from renderer in the main process.
//  * @param fileName - file name with path
//  * @returns - error message or empty string
//  */
// async function deleteDirInMain(fileName: string): Promise<string> {
//     try {
//         if (!fs.existsSync(fileName)) {
//             return '';
//         }

//         const stats = await fs.promises.stat(fileName);
//         if (!stats.isDirectory()) {
//             return 'Cannot delete file';
//         }

//         await fs.promises.rmdir(fileName, { recursive: true });
//         return '';
//     } catch (error) {
//         return errorToString(error);
//     }
// }
