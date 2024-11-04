import { proxySet } from "valtio/utils";
import { type FileContent } from "@shared/ipc-types";
import { uuid } from "@/store/manifest";

export function createEmptyFileContent(): FileContent {
    const rv: FileContent = {
        unid: uuid.asRelativeNumber(),
        idx: -1,

        fname: '',
        fpath: '',
        fmodi: 0,
        size: 0,
        raw: '',

        failed: false,
        notOur: false,
        newFile: true,
        fromMain: false,

        webFsItem: null,
        webFile: undefined,

        changesSet: proxySet<string>(),
    };
    return rv;
}

export function finalizeFileContent(fileContent: FileContent): FileContent {
    const rv: FileContent = {
        unid: uuid.asRelativeNumber(),
        idx: fileContent.idx,

        fname: fileContent.fname,
        fpath: fileContent.fpath,
        fmodi: fileContent.fmodi,
        size: fileContent.size,
        raw: fileContent.raw,

        failed: fileContent.failed,
        notOur: fileContent.notOur,
        newFile: false,
        fromMain: fileContent.fromMain,

        webFsItem: fileContent.webFsItem,
        webFile: fileContent.webFile,

        changesSet: proxySet<string>(),
    };
    return rv;
}
