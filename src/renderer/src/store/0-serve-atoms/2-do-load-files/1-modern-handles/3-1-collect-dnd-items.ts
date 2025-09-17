import { WebFsItem } from "@shared/ipc-types";
import { collectDndHandles, type DndHandle } from "./3-2-collect-dnd-handles";
import { FileWithPath, getFilesFromDataTransferItems } from "../2-legacy-entries";

/**
 * This is for modern and legay DnD items.
 * @param dataTransferItems - already filtered for files only (i.e. `item.kind === 'file'`)
 */
export async function collectWebDndItems(dataTransferItems: DataTransferItem[]): Promise<WebFsItem[]> {
    let rv: WebFsItem[] = [];

    const isFirefoxEntries = dataTransferItems.some((dtFileItem) => !dtFileItem.getAsFileSystemHandle);
    if (isFirefoxEntries) {
        const files: FileWithPath[] = await getFilesFromDataTransferItems(dataTransferItems);
        // printEntryFiles(files);

        rv = files.map(
            (file) => new WebFsItem({
                legacyFile: file,
                legacyPath: file.path,
            })
        );
    } else {
        const handles = await collectDndHandles(dataTransferItems);
        printHandles(handles);

        for (const [path, handle, dir] of handles) {
            const item = new WebFsItem({
                legacyFile: handle.kind === 'file' ? await handle.getFile() : null,
                handle,
                owner: dir,
                legacyPath: path,
            });
            rv.push(item);
        }
    }

    printWebFsitems(rv);
    /*
        125 - dropped
        125/c
        125/c/c
        125/c/c/c
        125/c/c/c/6ba4ea1a-4329-424c-b36f-4ea85629870b.test.dpm
    rv is [
        {"owner":{kind:'directory', name:'125'},"handle":{kind:'directory', name:'125'},      "legacyEntry":null,"legacyFile":null,"legacyPath":"125"},
        {"owner":{kind:'directory', name:'125'},"handle":{kind:'directory', name:'125/c'},    "legacyEntry":null,"legacyFile":null,"legacyPath":"125/c"},
        {"owner":{kind:'directory', name:'c'},  "handle":{kind:'directory', name:'125/c/c'},  "legacyEntry":null,"legacyFile":null,"legacyPath":"125/c/c"},
        {"owner":{kind:'directory', name:'c'},  "handle":{kind:'directory', name:'125/c/c/c'},"legacyEntry":null,"legacyFile":null,"legacyPath":"125/c/c/c"},
        
        {"owner":{kind:'directory', name:'c'},  "handle":{kind:'file', name:'6ba4ea1a-4329-424c-b36f-4ea85629870b.test.dpm'},
            "legacyEntry":null,
            "legacyFile":{name:'6ba4ea1a-4329-424c-b36f-4ea85629870b.test.dpm',lastModified:1679072000000,lastModified:1679072000000,lastModifiedDate:'Sat Aug 16 2025...',webkitRelativePath:'',size:2044,type:''},
            "legacyPath":"125/c/c/c"
        },
    ]
    */
    return rv;
}

function printEntryFiles(handles: FileWithPath[]) {
    console.log('🔊%cEntryFiles:', 'color: saddlebrown', 'Firefox entries detected');
    for (const file of handles) {
        console.log(`%cpath: "${file.path}"%o`, `color: tan`, { file });
    }
}

function printHandles(handles: DndHandle[]) {
    console.log('🔊%cDndHandles:', 'color: saddlebrown');

    for (const [path, handle, dir] of handles) {
        const isFile = isFsFileHandle(handle);
        console.log(
            `%c${isFile ? '  File' : 'Folder'} path: "${path}"`,
            `color: ${isFile ? 'tan' : 'fuchsia'}`,
            'handle:', FSHandleString(handle),
            'dir:', FSHandleString(dir), [path, handle, dir]
        );
    }
}

function printWebFsitems(items: WebFsItem[]) {
    console.log('🔊%cWebFsItems:', 'color: saddlebrown');

    for (const item of items) {
        console.log(`%cpath: "${item.legacyPath}"%o`, `color: ${item.handle?.kind === 'file' ? 'tan' : 'fuchsia'}`, { item });
    }
}

//

export function isFsFileHandle(handle: FileSystemHandle | FileSystemHandleUnion): handle is FileSystemFileHandle {
    return handle instanceof FileSystemHandle && handle.kind === 'file';
}

export function isFsDirectoryHandle(handle: FileSystemHandle | FileSystemHandleUnion): handle is FileSystemDirectoryHandle {
    return handle instanceof FileSystemHandle && handle.kind === 'directory';
}

function FileSystemHandlePrintable(handle: FileSystemHandle | FileSystemHandleUnion | null): { kind: string; name: string; } {
    if (!handle) {
        return { kind: 'null', name: 'null' };
    }
    if (handle instanceof FileSystemHandle) {
        return { kind: handle.kind, name: handle.name };
    }
    return { kind: '???', name: '???' };
}

function FSHandleString(handle: FileSystemHandle | FileSystemHandleUnion | null): string {
    if (!handle) {
        return 'null';
    }
    if (handle instanceof FileSystemHandle) {
        return `${handle.kind}:${handle.name}`;
    }
    return '???';
}
