import { findShortestPathInFnames } from "@/store/store-utils";
import { type WebFsItem } from "@shared/ipc-types";
import { type SetDeliveredFiles } from "../../1-do-set-files";
import { type OpenItem, getSingleFolderHandle } from "./9-types";
import { collectWebDndItems } from "../1-modern-handles";
import { loadWebFilesAndCreateFileContents } from "./7-load-web-files-create-filecnts";

/**
 * Create FileContent items from web drag and drop operation
 */
export async function createFileContents_WebAfterDnd(fileDataTransferItems: DataTransferItem[]): Promise<SetDeliveredFiles> {

    const webFsItems = await collectWebDndItems(fileDataTransferItems);
    const dndItems = webFsItems.filter((item) => item.legacyFile);
    const openItems: OpenItem[] = await mapToDropItems(dndItems, fileDataTransferItems);

    if (webFsItems.length === 1 && webFsItems[0]?.handle?.kind === 'directory') {
        const rv: SetDeliveredFiles = {
            root: {
                fpath: webFsItems[0].legacyPath,
                handle: webFsItems[0].handle,
                fromMain: false,
            },
            deliveredFileContents: [],
            noItemsJustDir: false,
            error: undefined,
        };
        return rv;
    } else {
        const deliveredFileContents = await loadWebFilesAndCreateFileContents(openItems);
        const rv: SetDeliveredFiles = {
            root: {
                fpath: findShortestPathInFnames(deliveredFileContents.map((item) => item.fpath)),
                handle: getSingleFolderHandle(openItems),
                fromMain: false,
            },
            deliveredFileContents,
            noItemsJustDir: false,
            error: undefined,
        };
        return rv;
    }
}

async function mapToDropItems(webFsItems: WebFsItem[], fileDataTransferItems: DataTransferItem[]): Promise<OpenItem[]> {
    let rv: OpenItem[] = [];
    try {
        rv = webFsItems.map(
            (webFsItem) => {
                const rv: OpenItem = {
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
