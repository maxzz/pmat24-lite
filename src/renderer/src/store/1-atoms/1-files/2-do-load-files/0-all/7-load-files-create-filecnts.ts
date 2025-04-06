import { proxySet } from "valtio/utils";
import { uuid } from "@/store/manifest";
import { isAllowedExt } from "@/utils";
import { textFileReaderPromisify } from "@/store/store-utils";
import { type FileContent, pmAllowedToOpenExt } from "@shared/ipc-types";
import { type OpenItem } from "./9-types";

export async function loadFilesAndCreateFileContents(openItems: OpenItem[]): Promise<FileContent[]> {
    const rv: FileContent[] = [];

    openItems.forEach((openItem) => openItem.notOur = !isAllowedExt(openItem.fname, pmAllowedToOpenExt));

    for (const [idx, openItem] of openItems.entries()) {
        if (!openItem.fileWeb) {
            console.error('Empty entry or file', openItem);
            continue;
        }

        try {
            const newItem: FileContent = {
                unid: uuid.asRelativeNumber(),
                idx,
                fname: openItem.fname,
                fpath: openItem.fpath,
                fmodi: openItem.fileWeb.lastModified,
                size: openItem.fileWeb.size,
                raw: '',

                newFile: false,
                newAsManual: false,
                fromMain: false,

                webFsItem: openItem.webFsItem,
                webFile: openItem.fileWeb,

                notOur: openItem.notOur,
                failed: false,

                changesSet: proxySet<string>(),
            };

            try {
                newItem.raw = openItem.notOur ? '' : await textFileReaderPromisify(openItem.fileWeb);
            } catch (error) {
                newItem.raw = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
            }

            rv.push(newItem);
        } catch (error) {
            console.error('Error processing drop item:', error, openItem);
        }
    }//for

    return rv;
}
