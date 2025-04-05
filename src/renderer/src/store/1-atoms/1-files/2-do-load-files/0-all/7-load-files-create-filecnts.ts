import { proxySet } from "valtio/utils";
import { uuid } from "@/store/manifest";
import { isAllowedExt } from "@/utils";
import { textFileReaderPromisify } from "@/store/store-utils";
import { type FileContent, pmAllowedToOpenExt } from "@shared/ipc-types";
import { DropItem } from "./9-types";

export async function loadFilesAndCreateFileContents(dropItems: DropItem[]): Promise<FileContent[]> {
    const rv: FileContent[] = [];

    dropItems.forEach((dropItem) => dropItem.notOur = !isAllowedExt(dropItem.fname, pmAllowedToOpenExt));

    for (const [idx, dropItem] of dropItems.entries()) {
        if (!dropItem.fileWeb) {
            console.error('Empty entry or file', dropItem);
            continue;
        }

        try {
            const newItem: FileContent = {
                unid: uuid.asRelativeNumber(),
                idx,
                fname: dropItem.fname,
                fpath: dropItem.fpath,
                fmodi: dropItem.fileWeb.lastModified,
                size: dropItem.fileWeb.size,
                raw: '',

                newFile: false,
                newAsManual: false,
                fromMain: false,

                webFsItem: dropItem.webFsItem,
                webFile: dropItem.fileWeb,

                notOur: dropItem.notOur,
                failed: false,

                changesSet: proxySet<string>(),
            };

            try {
                newItem.raw = dropItem.notOur ? '' : await textFileReaderPromisify(dropItem.fileWeb);
            } catch (error) {
                newItem.raw = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
            }

            rv.push(newItem);
        } catch (error) {
            console.error('Error processing drop item:', error, dropItem);
        }
    }//for

    return rv;
}
