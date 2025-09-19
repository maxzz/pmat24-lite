export type InputItem<T> = { path: string; isFolder: (userData: T) => boolean; userData?: T; };

export type FileItem<T> = T;

export interface FolderNode<T> {
    children?: Record<string, FolderNode<T>>;
    files: FileItem<T>[];
    folderData: T | undefined;
}

export type FolderTree<T> = Record<string, FolderNode<T>>;

/**
 * Convert array of { path, userData } into FolderTree.
 * - paths may use '/' or '\' as separators
 * - if a path is a directory (prefix of other paths) it becomes a folder key
 * - files are stored as objects { name, userData }
 */
export function pathsToFolderTree<T = unknown>(items: InputItem<T>[]): FolderTree<T> {
    const norm = (p: string) => p.replace(/\\/g, '/').replace(/^\/+|\/+$/g, ''); // make all slashes forward and remove leading and trailing slashes
    const normalized = items.map((it) => ({ path: norm(it.path), isFolder: it.isFolder, userData: it.userData }));

    // any path that is a prefix of another path is a directory
    const dirSet = new Set<string>();
    for (const item of normalized) {
        const { path, userData } = item;
        if (userData && item.isFolder(userData)) {
            const parts = path ? path.split('/') : [];
            let prefix = '';
            for (let i = 0; i < parts.length; i++) {
                prefix = prefix ? `${prefix}/${parts[i]}` : parts[i];
                dirSet.add(prefix);
            }
        }
    }

    const tree: FolderTree<T> = {};

    dirSet.forEach((dir) => ensureNode(dir.split('/'), tree)); // explicit or implicit folder entry - ensure node exists

    for (const item of normalized) {
        const { path, userData } = item;
        if (!path || !userData) {
            continue;
        }
        
        const parts = path.split('/');

        if (item.isFolder(userData)) {
            const node = ensureNode(parts, tree);
            node.folderData = userData;
            continue;
        }

        // file entry -> attach to parent folder (or root pseudo-folder)
        const node = ensureNode(parts, tree);
        node.files.push(userData);
    }

    return tree;
}

function ensureNode<T>(parts: string[], tree: FolderTree<T>): FolderNode<T> {
    // create nested nodes for parts; return node for last part
    if (!parts.length) {
        if (!tree['.']) {
            tree['.'] = { files: [], children: {}, folderData: undefined }; // create/return pseudo-root
        }
        return tree['.'];
    }

    let currentLevel = tree;
    let node: FolderNode<T> | undefined;

    for (const part of parts) {
        node = currentLevel[part];
        if (!node) {
            node = { files: [], children: {}, folderData: undefined };
            currentLevel[part] = node;
        } else if (!node.children) {
            node.children = {};
        }
        currentLevel = node.children!;
    }

    return node!;
}

// Example usage
/*
const input: InputItem<any>[] = [
  { path: 'folderA', userData: { isFolderMarker: true } },
  { path: 'folderA\\fileA', userData: { size: 123 } },
  { path: 'folderA\\fileB', userData: { size: 456 } },
  { path: 'folderA\\folderB', userData: undefined },
  { path: 'folderA\\folderB\\fileAA', userData: { size: 11 } },
  { path: 'folderA\\folderB\\fileAB', userData: { size: 22 } },
];

console.log(JSON.stringify(pathsToFolderTree(input), null, 2));
/* produces:
{
  "folderA": {
    "children": {
      "folderB": {
        "children": {}
        "files": [ { "size": 11 }, { "size": 22 } ], ],
      }
    },
    "files": [{ "size": 123 }, { "size": 456 }], ], // fileA, fileB
  }
}
*/
