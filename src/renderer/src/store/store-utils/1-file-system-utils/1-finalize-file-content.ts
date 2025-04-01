import { proxySet } from "valtio/utils";
import { type FileContent } from "@shared/ipc-types";
import { uuid } from "@/store/manifest";

export function finalizeFileContent(fileContent: FileContent | null): FileContent {
    const rv: FileContent = {
        unid: uuid.asRelativeNumber(),
        idx: fileContent?.idx ?? -1,

        fname: fileContent?.fname || '',
        fpath: fileContent?.fpath || '',
        fmodi: fileContent?.fmodi || 0,
        size: fileContent?.size || 0,
        raw: fileContent?.raw || '',

        failed: fileContent?.failed ?? false,
        notOur: fileContent?.notOur ?? false,
        newFile: fileContent?.newFile ?? true,
        newAsManual: fileContent?.newAsManual ?? false,
        newAsCpass: fileContent?.newAsCpass ?? false,
        fromMain: fileContent?.fromMain ?? false,

        webFsItem: fileContent?.webFsItem || null,
        webFile: fileContent?.webFile,

        changesSet: proxySet<string>(),
    };
    return rv;
}
