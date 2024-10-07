import { collectDndHandles, type DndHandle } from "../2-modern-handles";

export async function collectDndItems(dataTransferItems: DataTransferItemList) {
    const dtFileItems = [...dataTransferItems].filter((dtItem) => dtItem.kind === 'file');

    const isFirefoxEntries = dtFileItems.some((dtFileItem) => !dtFileItem.getAsFileSystemHandle);
    if (isFirefoxEntries) {
        console.log('Firefox entries detected');
        return [];
    }

    const handles = await collectDndHandles(dtFileItems);

    printHandles(handles);
    return handles;
}

function printHandles(handles: DndHandle[]) {
    for (const [path, handle] of handles) {
        console.log(`%cpath: "${path.join('/')}"%o`, `color: ${handle.kind === 'file' ? 'tan' : 'fuchsia'}`, handle);
    }
}
