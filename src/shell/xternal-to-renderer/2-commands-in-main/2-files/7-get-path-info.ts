import fs from "fs";
import { errorToString } from "@shell/3-utils-main";
import { type R2MInvoke } from "@shared/ipc-types";

/**
 * Get path info (isDirectory) from renderer in the main process.
 * @param filePath - file path to check
 * @returns path info with isDirectory flag
 */
export async function getPathInfoInMain(filePath: string): Promise<R2MInvoke.InvokeResult<R2MInvoke.GetPathInfo>> { // call 'r2mi:get-path-info' in main
    try {
        if (!filePath) {
            return {
                filePath: '',
                isDirectory: false,
                error: 'Empty file path',
            };
        }

        const stats = await fs.promises.stat(filePath);
        return {
            filePath,
            isDirectory: stats.isDirectory(),
            error: undefined,
        };
    } catch (error) {
        const msg = error instanceof Error ? error.message : `${error}`;
        return {
            filePath: '',
            isDirectory: false,
            error: msg,
        };
    }
}
