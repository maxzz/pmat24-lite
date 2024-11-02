import { R2MInvoke, type MainFileContent } from "@shared/ipc-types";
import { mainApi } from "../to-main-apis";

export function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<MainFileContent[]> {
    const d: R2MInvoke.AllInvokes = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };
    return mainApi?.invokeMain(d) as Promise<MainFileContent[]>;
}
