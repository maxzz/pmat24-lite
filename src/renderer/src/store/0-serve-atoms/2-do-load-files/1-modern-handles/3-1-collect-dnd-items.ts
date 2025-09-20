import { WebFsItem } from "@shared/ipc-types";
import { collectDndHandles, type DndHandle } from "./3-2-collect-dnd-handles";
import { FileWithPath, getFilesFromDataTransferItems } from "../2-legacy-entries";
import { type FolderNode, type FolderTree, pathsToFolderTree } from "./3-3-paths-to-tree";
import { toast } from "sonner";

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

        if (handles.length === 1) {
            const [fullPath, handle, ownerDir] = handles[0];
            if (!handle || handle.kind !== 'directory') {
                const text = handle.name.endsWith('.lnk') ? 'The Windows shortcut cannot be opened by the web version of PMAT.' : 'You can only open one folder at a time.';
                toast.warning(text);
                return rv;
            }
            if (handle.kind === 'directory') {
                const item = await asyncDndHandleToWebFsItem(handles[0]); // This will allow to open a single folder even if it's empty
                rv.push(item);
                return rv;
            }
        }

        const tree = pathsToFolderTree(handles.map((item) => ({ path: item[0], isFolder: (userData: DndHandle) => userData[1]?.kind === 'directory', userData: item })));
        const pmatHandles = getPmatFileHandles(tree);
        // printHandles(handles);
        // printTreeHandles(tree);
        // printHandles(pmatHandles);

        for (const dndHandle of pmatHandles) {
            const item = await asyncDndHandleToWebFsItem(dndHandle);
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

async function asyncDndHandleToWebFsItem([fullPath, handle, ownerDir]: DndHandle): Promise<WebFsItem> {
    const rv = new WebFsItem({
        legacyFile: handle.kind === 'file' ? await handle.getFile() : null,
        handle,
        owner: ownerDir,
        legacyPath: fullPath,
    });
    return rv;
}

function getPmatFileHandles(tree: FolderTree<DndHandle>): DndHandle[] {
    const values = Object.values(tree);
    const root = values.length === 1 && values[0]; // allow only one folder in the root of the tree
    if (!root) {
        return [];
    }

    const rv: DndHandle[] = [
        ...root.files,
        ...(root.children?.['c']?.files || []),
        ...(root.children?.['C']?.files || []),
    ];

    return rv;
}

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

    function FSHandleString(handle: FileSystemHandle | FileSystemHandleUnion | null): string {
        if (!handle) {
            return 'null';
        }
        if (handle instanceof FileSystemHandle) {
            return `%c${handle.kind === 'file' ? '  file' : 'folder'}:%c"${handle.name}"`;
        }
        return '???';
    }
}

// traverse tree and print each item's userData handles using FSHandleString()
function printTreeHandles<T>(nodeMap: Record<string, FolderNode<T>>, indent = '') {
    !indent && console.log('🔊 %cTree DndHandles:', 'color: saddlebrown');

    for (const [name, node] of Object.entries(nodeMap)) {
        console.log(`${indent}%cFolder: "${name}"`, 'color: fuchsia; font-weight: 600;');

        for (const file of node.files) {
            const ud = file as unknown as DndHandle | undefined;
            if (Array.isArray(ud) && ud.length >= 3) {
                const [fullPath, handle, ownerDir] = ud;
                const handleStr = FSHandleString(handle);
                const ownerStr = FSHandleString(ownerDir);
                console.log(
                    `    ${indent}%cFile: %c"${name}" %cpath: %c"${fullPath}" %chandle: ${handleStr} %cowner: ${ownerStr}`,
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
                console.log(`%c  File: "???"`, 'color: red', { file });
            }
        }

        if (node.children && Object.keys(node.children).length > 0) {
            printTreeHandles(node.children, indent + '    ');
        }
    }

    function FSHandleString(handle: FileSystemHandle | FileSystemHandleUnion | null): string {
        if (!handle) {
            return 'null';
        }
        if (handle instanceof FileSystemHandle) {
            return `%c${handle.kind === 'file' ? 'file' : 'folder'}:%c"${handle.name}"`;
        }
        return '???';
    }
}

function printWebFsitems(items: WebFsItem[]) {
    console.log('🔊 %cWebFsItems:', 'color: saddlebrown');

    for (const item of items) {
        console.log(`%cpath: "${item.legacyPath}"%o`, `color: ${item.handle?.kind === 'file' ? 'tan' : 'fuchsia'}`, { item });
    }
}
