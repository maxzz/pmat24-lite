import { invokeLoadFiles } from "@/xternal-to-main";
import { pmAllowedToOpenExt } from "@shared/ipc-types";
import { type PmatFolder } from "../../0-files-atom";
import { type SetDeliveredFiles } from "../../1-do-set-files";

export async function createFileContents_FromMru_Main(folder: PmatFolder): Promise<SetDeliveredFiles | undefined> {
    if (folder.fpath) {
        const { filesCnt: deliveredFileContents, emptyFolder } = await invokeLoadFiles([folder.fpath], pmAllowedToOpenExt);
        
        const rv: SetDeliveredFiles = {
            root: folder,
            deliveredFileContents,
            noItemsJustDir: false,
        };
        return rv;
    }
}
