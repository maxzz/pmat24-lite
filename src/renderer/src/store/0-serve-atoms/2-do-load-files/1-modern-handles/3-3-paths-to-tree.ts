export type InputItem<T> = { path: string; userData?: T };

export type FileItem<T> = { name: string; userData?: T };

export interface FolderNode<T> {
    files: FileItem<T>[];
    children?: Record<string, FolderNode<T>>;
}

export type FolderTree<T> = Record<string, FolderNode<T>>;

/**
 * Convert array of { path, userData } into FolderTree.
 * - paths may use '/' or '\' as separators
 * - if a path is a directory (prefix of other paths) it becomes a folder key
 * - files are stored as objects { name, userData }
 */
export function pathsToFolderTree<T = unknown>(items: InputItem<T>[]): FolderTree<T> {
    const sepRe = /[\\/]/g;
    const norm = (p: string) => p.replace(sepRe, '/').replace(/^\/|\/$/g, '');
    const normalized = items.map((it) => ({ path: norm(it.path), userData: it.userData }));

    // any path that is a prefix of another path is a directory
    const dirSet = new Set<string>();
    for (const { path } of normalized) {
        const parts = path.split('/');
        for (let i = 1; i < parts.length; i++) {
            dirSet.add(parts.slice(0, i).join('/'));
        }
    }

    const tree: FolderTree<T> = {};

    function ensureNode(parts: string[]): FolderNode<T> {
        // create nested nodes for parts; return node for last part
        if (parts.length === 0) {
            // create/return pseudo-root
            if (!tree['.']) tree['.'] = { files: [], children: {} };
            return tree['.'];
        }

        let currentLevel = tree;
        let node: FolderNode<T> | undefined;
        for (const part of parts) {
            node = currentLevel[part];
            if (!node) {
                node = { files: [], children: {} };
                currentLevel[part] = node;
            } else if (!node.children) {
                node.children = {};
            }
            currentLevel = node.children!;
        }
        return node!;
    }

    for (const { path, userData } of normalized) {
        if (!path) continue;
        const parts = path.split('/');
        const pathKey = parts.join('/');

        if (dirSet.has(pathKey)) {
            // explicit or implicit folder entry - ensure node exists
            ensureNode(parts);
            continue;
        }

        // file entry -> attach to parent folder (or root pseudo-folder)
        const fileName = parts[parts.length - 1];
        const parent = parts.slice(0, -1);
        const node = parent.length === 0 ? ensureNode([]) : ensureNode(parent);
        node.files.push({ name: fileName, userData });
    }

    return tree;
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
    "files": [
      {
        "name": "fileA",
        "userData": { "size": 123 }
      },
      {
        "name": "fileB",
        "userData": { "size": 456 }
      }
    ],
    "children": {
      "folderB": {
        "files": [
          {
            "name": "fileAA",
            "userData": { "size": 11 }
          },
          {
            "name": "fileAB",
            "userData": { "size": 22 }
          }
        ],
        "children": {}
      }
    }
  }
}
*/
