import { proxySet } from "valtio/utils";
import { R2MInvoke, type FileContent, type MainFileContent } from "@shared/ipc-types";
import { mainApi } from "../to-main-apis";
import { uuid } from "@/store/manifest";
import { setRootDir } from "@/store/atoms/1-files/2-do-web-deliver/0-all/7-root-dir";
import { findShortestPathInFnames } from "@/store/atoms/1-files/2-do-web-deliver/0-all/6-find-files-root-dir";
import { toUnix } from "@/utils";

export async function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<FileContent[]> {
    const d: R2MInvoke.AllInvokes = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };

    const res = await mainApi?.invokeMain<R2MInvoke.AllInvokes, MainFileContent[]>(d);
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

export function setRootFromMainFileContents(fileContents: FileContent[]): void {
    const rootPath = findShortestPathInFnames(fileContents.map((f) => f.fpath));
    setRootDir({ rpath: rootPath, dir: undefined, fromMain: true });
}
