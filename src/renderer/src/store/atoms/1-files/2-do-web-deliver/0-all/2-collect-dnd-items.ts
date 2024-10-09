import { WebFsItem } from "@shared/ipc-types";
import { collectDndHandles, type DndHandle } from "../2-modern-handles";
import { FileWithPath, getFilesFromDataTransferItems } from "../3-legacy-entries";

/**
 * @param dataTransferItems - already filtered for files (i.e. `item.kind === 'file'`)
 */
export async function collectDndItems(dataTransferItems: DataTransferItem[]): Promise<WebFsItem[]> {
    let rv: WebFsItem[] = [];

    const isFirefoxEntries = dataTransferItems.some((dtFileItem) => !dtFileItem.getAsFileSystemHandle);
    if (isFirefoxEntries) {
        const files: FileWithPath[] = await getFilesFromDataTransferItems(dataTransferItems);
        // printEntryFiles(files);

        rv = files.map(
            (file) => new WebFsItem({
                file,
                path: file.path,
            })
        );
        // console.log('Firefox entries detected');
    } else {
        const handles = await collectDndHandles(dataTransferItems);
        // printHandles(handles);

        for (const [path, handle] of handles) {
            const item: WebFsItem = new WebFsItem({
                file: handle.kind === 'file' ? await handle.getFile() : null,
                handle,
                path: path.join('/'),
            });
            rv.push(item);
        }
    }

    // printWebFsitems(rv);
    return rv;
}

function printHandles(handles: DndHandle[]) {
    for (const [path, handle] of handles) {
        console.log(`%cpath: "${path.join('/')}"%o`, `color: ${handle.kind === 'file' ? 'tan' : 'fuchsia'}`, handle);
    }
}

function printEntryFiles(handles: FileWithPath[]) {
    for (const file of handles) {
        console.log(`%cpath: "${file.path}"%o`, `color: tan`, { file });
    }
}

function printWebFsitems(items: WebFsItem[]) {
    for (const item of items) {
        console.log(`%cpath: "${item.path}"%o`, `color: ${item.handle?.kind === 'file' ? 'tan' : 'fuchsia'}`, { item });
    }
}
