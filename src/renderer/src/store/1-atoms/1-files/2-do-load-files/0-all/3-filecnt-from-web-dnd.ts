import { findShortestPathInFnames } from "@/store/store-utils";
import { type WebFsItem } from "@shared/ipc-types";
import { type SetDeliveredFiles } from "../../1-do-set-files";
import { collectWebDndItems } from "../1-modern-handles";
import { DropItem, getSingleFolderHandle } from "./9-types";
import { loadFilesAndCreateFileContents } from "./7-load-files-create-filecnts";

/**
 * Create FileContent items from web drag and drop operation
 */
export async function createFileContents_WebAfterDnd(fileDataTransferItems: DataTransferItem[]): Promise<SetDeliveredFiles> {

    const webFsItems = await collectWebDndItems(fileDataTransferItems);
    const dndItems = webFsItems.filter((item) => item.legacyFile);
    const dropItems: DropItem[] = await mapToDropItems(dndItems, fileDataTransferItems);

    if (webFsItems.length === 1 && webFsItems[0]?.handle?.kind === 'directory') {
        const rv: SetDeliveredFiles = {
            root: {
                fpath: webFsItems[0].legacyPath,
                handle: webFsItems[0].handle,
                fromMain: false,
            },
            deliveredFileContents: [],
            noItemsJustDir: false,
        };
        return rv;
    } else {
        const deliveredFileContents = await loadFilesAndCreateFileContents(dropItems);
        const rv: SetDeliveredFiles = {
            root: {
                fpath: findShortestPathInFnames(deliveredFileContents.map((item) => item.fpath)),
                handle: getSingleFolderHandle(dropItems),
                fromMain: false,
            },
            deliveredFileContents,
            noItemsJustDir: false,
        };
        return rv;
    }
}

async function mapToDropItems(webFsItems: WebFsItem[], fileDataTransferItems: DataTransferItem[]): Promise<DropItem[]> {
    let rv: DropItem[] = [];
    try {
        rv = webFsItems.map(
            (webFsItem) => {
                const rv: DropItem = {
                    fname: webFsItem.legacyFile!.name,
                    fpath: webFsItem.legacyPath,
                    fileWeb: webFsItem.legacyFile!,
                    webFsItem: webFsItem,
                    notOur: false,
                };
                return rv;
            }
        );
    } catch (error) {
        console.error('cannot read from DataTransferItemList', fileDataTransferItems);
    }
    return rv;
}
