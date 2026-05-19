import { proxySet } from "valtio/utils";
import { uuid } from "@/store/8-manifest";
import { isAllowedExt } from "@/utils";
import { textFileReaderPromisify } from "@/store/store-utils";
import { type FileContent, pmAllowedToOpenExt } from "@shared/ipc-types";
import { type OpenItem } from "./9-types";

const ABC_SUBFOLDERS = new Set(['a', 'b', 'c']);

/**
 * Returns true if the file's folder path is at the root or one level deep in an A/B/C subfolder.
 * fpath examples: "" | "RootFolder" | "RootFolder/A" | "RootFolder/A/sub" | "RootFolder/D"
 */
function isAllowedFolderDepth(fpath: string): boolean {
    const parts = fpath.split('/');
    if (parts.length <= 1) return true;                                     // root-level file (or individual file with no path)
    if (parts.length === 2) return ABC_SUBFOLDERS.has(parts[1].toLowerCase()); // one subfolder — must be A, B, or C
    return false;                                                           // deeper than one level: skip
}

export async function loadWebFilesAndCreateFileContents(openItems: OpenItem[]): Promise<FileContent[]> {
    const rv: FileContent[] = [];

    const allowedItems = openItems.filter((item) => isAllowedFolderDepth(item.fpath));
    allowedItems.forEach((openItem) => openItem.notOur = !isAllowedExt(openItem.fname, pmAllowedToOpenExt));

    for (const [idx, openItem] of allowedItems.entries()) {
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
                rawLoaded: '',

                newFile: false,
                newAsManual: false,
                fromMain: false,

                webFsItem: openItem.webFsItem,

                notOur: openItem.notOur,
                failed: false,

                changesSet: proxySet<string>(),
            };

            try {
                newItem.rawLoaded = openItem.notOur ? '' : await textFileReaderPromisify(openItem.fileWeb);
            } catch (error) {
                newItem.rawLoaded = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
            }

            rv.push(newItem);
        } catch (error) {
            console.error('Error processing drop item:', error, openItem);
        }
    }//for

    return rv;
}
