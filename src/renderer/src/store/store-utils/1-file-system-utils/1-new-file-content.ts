import { proxySet } from "valtio/utils";
import { uuid } from "@/store/manifest";
import { hasMain } from '@/xternal-to-main';
import { type FileContent } from "@shared/ipc-types";

export function createNewFileContent({ raw, newAsManual, newAsCpass }: { raw: string; newAsManual: boolean; newAsCpass: boolean; }): FileContent {
    return {
        unid: uuid.asRelativeNumber(),
        idx: 0,
        fname: '',
        fpath: '',
        fmodi: 0,
        size: 0,
        raw,
        failed: false,
        notOur: false,
        newFile: true,
        newAsManual,
        newAsCpass,
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

// TODO: if we need to create new manifest from scratch
// import { createManualFormDetection, createManualFormFields, createManualFormOptions, createNewManualForm } from '@/store/manifest';
// if (fileCnt.newFile) {
//     //TODO: create new mani field
//     //TODO: call createNewManualForm() here

//     // const detection = createManualFormDetection({ caption: 'todo', dlg_class: 'todo', processname: 'todo', commandline: 'todo' });
//     // const options = createManualFormOptions();
//     // const fields = createManualFormFields();
//     // const form = createNewManualForm({ detection, options, fields });
// }
