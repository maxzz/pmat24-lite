import { proxySet } from "valtio/utils";
import { toWindows } from "@/utils";
import { uuid } from "@/store/manifest";
import { type FileContent, type MainFileContent } from "@shared/ipc-types";
import { invokeMainTyped } from "../3-to-main-apis";

export type InvokeLoadFilesResult = {
    filesCnt: FileContent[];
    emptyFolder: string;
    error: string | undefined;
};

export async function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<InvokeLoadFilesResult> {
    const { filesCnt, emptyFolder, error } = await invokeMainTyped({ type: 'r2mi:load-files', filenames, ...(allowedExt && { allowedExt }), });
    
    const rv: InvokeLoadFilesResult = { 
        filesCnt: (filesCnt || []).map(finalizeFileContent), 
        emptyFolder,
        error,
     };
    return rv;
}

/**
 * Complete the file content with additional properties on the renderer side.
 */
export function finalizeFileContent(fileContent: MainFileContent): FileContent {
    const rv = fileContent as FileContent;

    rv.unid = uuid.asRelativeNumber();
    rv.changesSet = proxySet<string>();
    rv.fpath = toWindows(rv.fpath);

    return rv;
}
