import { WebFsItem } from "@shared/ipc-types";
import { collectDndHandles, type DndHandle } from "./3-2-collect-dnd-handles";
import { FileWithPath, getFilesFromDataTransferItems } from "../2-legacy-entries";
import { pathsToFolderTree } from "./3-3-paths-to-tree";

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
        const handles: DndHandle[] = await collectDndHandles(dataTransferItems);
        //printHandles(handles);

        const tree = pathsToFolderTree(handles.map((item) => ({ path: item[0], userData: item })));
        printTreeHandles(tree);

        // console.log({ tree });
        // const handlesBYDir = handles.reduce((acc, item) => {
        //     const [fullPath, handle, ownerDir] = item;
        //     return acc;
        // }, {} as Record<string, DndHandle[]>);

        for (const [fullPath, handle, ownerDir] of handles) {
            const item = new WebFsItem({
                legacyFile: handle.kind === 'file' ? await handle.getFile() : null,
                handle,
                owner: ownerDir,
                legacyPath: fullPath,
            });
            rv.push(item);
        }
    }

    //printWebFsitems(rv);
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

// type of handlesByDir

type HandlesTree = Record<string, Record<string, DndHandle[]> | DndHandle[]>;

function printEntryFiles(handles: FileWithPath[]) {
    console.log('🔊 %cEntryFiles:', 'color: saddlebrown', 'Firefox entries detected');
    for (const file of handles) {
        console.log(`%cpath: "${file.path}"%o`, `color: tan`, { file });
    }
}

function printHandles(handles: DndHandle[]) {
    console.log('🔊 %cDndHandles:', 'color: saddlebrown');

    for (const [fullPath, handle, ownerDir] of handles) {
        const isFile = handle.kind === 'file';
        const fileColor = isFile ? 'tan' : 'fuchsia';
        const handleStr = FSHandleString(handle);
        const ownerDirStr = FSHandleString(ownerDir);
        console.log(
            `%c       ${isFile ? '  File' : 'Folder'} full path: %c"${fullPath}" %cownerDir: ${ownerDirStr} %chandle: ${handleStr}`,
            'color: gray; font-size: 0.5rem;',
            `color: ${fileColor}`,
            'color: gray; font-size: 0.5rem;',
            'color: saddlebrown',
            'color: saddlebrown',
            'color: gray; font-size: 0.5rem;',
            'color: saddlebrown',
            'color: saddlebrown',
            // { all: [path, handle, dir] }
        );
    }
}

function printWebFsitems(items: WebFsItem[]) {
    console.log('🔊 %cWebFsItems:', 'color: saddlebrown');

    for (const item of items) {
        console.log(`%cpath: "${item.legacyPath}"%o`, `color: ${item.handle?.kind === 'file' ? 'tan' : 'fuchsia'}`, { item });
    }
}

//

function FSHandleString(handle: FileSystemHandle | FileSystemHandleUnion | null): string {
    if (!handle) {
        return 'null';
    }
    if (handle instanceof FileSystemHandle) {
        return `%c${handle.kind === 'file' ? '  file' : 'folder'}:%c"${handle.name}"`;
    }
    return '???';
}

// traverse tree and print each item's userData handles using FSHandleString()
function printTreeHandles<T>(nodeMap: Record<string, import("./3-3-paths-to-tree").FolderNode<T>>, indent = '') {
    for (const [name, node] of Object.entries(nodeMap)) {
        console.log(`${indent}%cFolder: "${name}"`, 'color: fuchsia; font-weight: 600;');

        for (const file of node.files) {
            const ud = file.userData as unknown as DndHandle | undefined;
            if (Array.isArray(ud) && ud.length >= 3) {
                const [fullPath, handle, ownerDir] = ud;
                const handleStr = FSHandleString(handle);
                const ownerStr = FSHandleString(ownerDir);
                console.log(
                    `    %cFile: %c"${file.name}" %cpath: %c"${fullPath}" %chandle: ${handleStr} %cowner: ${ownerStr}`,
                    'color: gray; font-size: 0.5rem;', // file
                    'color: tan',
                    'color: gray; font-size: 0.5rem;', // path
                    'color: saddlebrown',
                    'color: gray; font-size: 0.5rem;', // handle
                    'color: saddlebrown',
                    'color: saddlebrown',
                    'color: gray; font-size: 0.5rem;',  // owner
                    'color: saddlebrown',
                    'color: saddlebrown',
                );
            } else {
                console.log(`%c  File: "${file.name}"`, 'color: tan', { file });
            }
        }

        if (node.children && Object.keys(node.children).length > 0) {
            printTreeHandles(node.children, indent + '  ');
        }
    }
}
