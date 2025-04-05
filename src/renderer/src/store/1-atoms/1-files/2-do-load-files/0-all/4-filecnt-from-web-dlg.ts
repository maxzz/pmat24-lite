import { pathWithoutFilename } from "@/utils";
import { isFileWithDirectoryAndFileHandle, isFileWithFileHandle } from "@/store/store-utils";
import { type FileContent, WebFsItem } from "@shared/ipc-types";
import { DropItem } from "./9-types";
import { loadFilesAndCreateFileContents } from "./7-load-files-create-filecnts";

/**
 * Create FileContent items from open file/directory web dialog
 */
export async function createFileContents_WebAfterDlgOpen(files: File[]): Promise<FileContent[]> {

    let dropItems: DropItem[] = await mapToDropItems(files);
    const rv = loadFilesAndCreateFileContents(dropItems);
    return rv;

    async function mapToDropItems(files: File[]): Promise<DropItem[]> {
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(files.map(
                async (file) => {
                    const webFsItem = new WebFsItem({
                        legacyFile: file,
                        handle: isFileWithFileHandle(file) ? file.handle : null,
                        parent: isFileWithDirectoryAndFileHandle(file) ? file.directoryHandle : null,
                        legacyPath: pathWithoutFilename(file.webkitRelativePath), // webkitRelativePath is "C/D/E/{10250eb8-d616-4370-b3ab-39aedb8c6950}.dpm"
                    });

                    const rv: DropItem = {
                        fname: file.name,
                        fpath: webFsItem.legacyPath,
                        fileWeb: file,
                        webFsItem: webFsItem,
                        notOur: false,
                    };
                    return rv;
                }
            ));
        } catch (error) {
            console.error('cannot read from File[]', files);
        }
        return rv;
    }
}
