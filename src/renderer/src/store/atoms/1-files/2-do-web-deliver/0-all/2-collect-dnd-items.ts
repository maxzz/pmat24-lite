import { WebFsItem } from "@shared/ipc-types";
import { collectDndHandles, type DndHandle } from "../2-modern-handles";
import { getAllFileEntries } from "../3-legacy-entries";
import { FileWithHandleAndPath } from "../3-legacy-entries/2-dnd-w-entries";

/**
 * @param dataTransferItems - already filtered for files (i.e. `item.kind === 'file'`)
 */
export async function collectDndItems(dataTransferItems: DataTransferItem[]): Promise<WebFsItem[]> {

    // const isFirefoxEntries = dataTransferItems.some((dtFileItem) => !dtFileItem.getAsFileSystemHandle);
    // if (isFirefoxEntries) {
        console.log('Firefox entries detected');

        const files: FileWithHandleAndPath[] = await getAllFileEntries(dataTransferItems);

        const rv: WebFsItem[] = files.map(
            (file) => new WebFsItem({
                file: file,
                path: file.path,
            })
        );

        return rv;
    // }

    // const handles = await collectDndHandles(dataTransferItems);
    // printHandles(handles);

    // const rv: WebFsItem[] = [];

    // for await (const [path, handle] of handles) {
    //     const item: WebFsItem = new WebFsItem({
    //         handle: handle,
    //         path: path.join('/'),
    //         file: handle.kind === 'file' ? await handle.getFile() : null,
    //     });
    //     rv.push(item);
    // }

    // return rv;
}

function printHandles(handles: DndHandle[]) {
    for (const [path, handle] of handles) {
        console.log(`%cpath: "${path.join('/')}"%o`, `color: ${handle.kind === 'file' ? 'tan' : 'fuchsia'}`, handle);
    }
}
