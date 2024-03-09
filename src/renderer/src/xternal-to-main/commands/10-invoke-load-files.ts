import { R2MInvoke, FileContent } from "@shared/ipc-types";
import { mainApi } from "../to-main-apis";

export function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<FileContent[]> {
    const d: R2MInvoke.InvokeCalls = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };
    return mainApi?.invokeMain(d) as Promise<FileContent[]>;
}
