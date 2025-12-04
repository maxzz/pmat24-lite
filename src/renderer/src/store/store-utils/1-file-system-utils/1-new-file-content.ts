import { proxySet } from "valtio/utils";
import { uuid } from "@/store/8-manifest";
import { hasMain } from "@/xternal-to-main";
import { type FileContent } from "@shared/ipc-types";

export function createNewFileContent({ raw, newAsManual }: { raw: string; newAsManual: boolean; }): FileContent {
    return {
        unid: uuid.asRelativeNumber(),
        idx: 0,
        fname: '',
        fpath: '',
        fmodi: 0,
        size: 0,
        rawLoaded: raw,
        failed: false,
        notOur: false,
        newFile: true,
        newAsManual,
        fromMain: hasMain(),
        webFsItem: null,
        changesSet: new Set(),
    };
}

export function finalizeFileContent(fileContent: FileContent | null): FileContent {
    const rv: FileContent = {
        unid: uuid.asRelativeNumber(),
        idx: fileContent?.idx ?? -1, //TODO: should be updated when file inserted to the tree

        fname: fileContent?.fname || '',
        fpath: fileContent?.fpath || '',
        fmodi: fileContent?.fmodi || 0,
        size: fileContent?.size || 0,
        rawLoaded: fileContent?.rawLoaded || '',

        failed: fileContent?.failed ?? false,
        notOur: fileContent?.notOur ?? false,
        newFile: fileContent?.newFile ?? true,
        newAsManual: fileContent?.newAsManual ?? false,
        fromMain: fileContent?.fromMain ?? false,

        webFsItem: fileContent?.webFsItem || null,

        changesSet: proxySet<string>(),
    };
    return rv;
}
