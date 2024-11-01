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

        for (const [path, handle, dir] of handles) {
            const item = new WebFsItem({
                file: handle.kind === 'file' ? await handle.getFile() : null,
                handle,
                parent: dir,
                path,
            });
            rv.push(item);
        }
    }

    // printWebFsitems(rv);
    return rv;
}

function printEntryFiles(handles: FileWithPath[]) {
    console.log('%cEntryFiles:', 'color: saddlebrown');
    for (const file of handles) {
        console.log(`%cpath: "${file.path}"%o`, `color: tan`, { file });
    }
}

function printHandles(handles: DndHandle[]) {
    console.log('%cDndHandles:', 'color: saddlebrown');
    for (const [path, handle, dir] of handles) {
        console.log(`%cpath: "${path}"%o`, `color: ${handle.kind === 'file' ? 'tan' : 'fuchsia'}`, { handle, dir });
    }
}

function printWebFsitems(items: WebFsItem[]) {
    console.log('%cWebFsItems:', 'color: saddlebrown');
    for (const item of items) {
        console.log(`%cpath: "${item.path}"%o`, `color: ${item.handle?.kind === 'file' ? 'tan' : 'fuchsia'}`, { item });
    }
}
