import { type R2MInvoke } from "@shared/ipc-types";
import { existsFileInMain } from "./4-file-names";
import { errorToString, runProcess } from "@shell/3-utils-main";

export async function execFileInMain(fileName: string): Promise<R2MInvoke.EmptyOkOrError> { // call 'r2mi:exec-file' in main
    try {
        const { exists, error } = await existsFileInMain(fileName);
        if (!exists || error) {
            return `File "${fileName}" does not exist.`;
        }
        const rv = await runProcess(fileName);
        return rv;
    } catch (error) {
        return errorToString(error);
    }
}
