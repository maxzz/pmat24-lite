import { proxySet } from "valtio/utils";
import { toUnix } from "@/utils";
import { uuid } from "@/store/manifest";
import { type R2MInvoke, type FileContent, type MainFileContent } from "@shared/ipc-types";
import { findShortestPathInFnames, PmatFolder } from "@/store";
import { mainApi } from "../3-to-main-apis";

export async function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<FileContent[]> {
    const params: R2MInvoke.AllInvokes = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };

    const res = await mainApi?.invokeMain<R2MInvoke.AllInvokes, MainFileContent[]>(params);
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

export function getRootFromFpath({ files, fromMain }: { files: { fpath: string; }[]; fromMain: boolean; }): PmatFolder {
    const rootPath = findShortestPathInFnames(files.map((f) => f.fpath));

    return {
        fpath: rootPath,
        handle: undefined,
        fromMain,
    };
}
