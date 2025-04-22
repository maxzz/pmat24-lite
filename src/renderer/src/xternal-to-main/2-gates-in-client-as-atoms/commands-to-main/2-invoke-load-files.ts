import { proxySet } from "valtio/utils";
import { toUnix } from "@/utils";
import { uuid } from "@/store/manifest";
import { type R2MInvoke, type FileContent, type MainFileContent } from "@shared/ipc-types";
import { invokeMainTyped } from "../3-to-main-apis";

export async function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<FileContent[]> {
    const params: R2MInvoke.AllInvokes = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };

    const res = await invokeMainTyped(params);
    const rv = (res || []).map(finalizeFileContent);
    return rv;
}

/**
 * Complete the file content with additional properties on the renderer side.
 */
export function finalizeFileContent(fileContent: MainFileContent): FileContent {
    const rv = fileContent as FileContent;

    rv.unid = uuid.asRelativeNumber();
    rv.changesSet = proxySet<string>();
    rv.fpath = toUnix(rv.fpath);

    return rv;
}
