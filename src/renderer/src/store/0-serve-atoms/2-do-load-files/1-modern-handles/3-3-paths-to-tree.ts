type FileName = string;

interface FolderNode {
    files: FileName[];
    children?: Record<string, FolderNode>;
}

type FolderTree = Record<string, FolderNode>;

export function pathsToFolderTree(paths: string[]): FolderTree {
    const sepRe = /[\\/]/g;
    const norm = (p: string) => p.replace(sepRe, '/').replace(/^\/|\/$/g, '');
    const normalized = paths.map(norm);

    // any path that is a prefix of another path is a directory
    const dirSet = new Set<string>();
    for (const p of normalized) {
        const parts = p.split('/');
        for (let i = 1; i < parts.length; i++) {
            dirSet.add(parts.slice(0, i).join('/'));
        }
    }

    const tree: FolderTree = {};

    function ensureNode(parts: string[]): FolderNode {
        let currentLevel = tree;
        let node: FolderNode | undefined;
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
        // node is guaranteed to exist after loop (parts non-empty)
        return node!;
    }

    for (const p of normalized) {
        const parts = p === '' ? [] : p.split('/');
        if (parts.length === 0) continue;

        const pathKey = parts.join('/');
        if (dirSet.has(pathKey)) {
            // explicit folder entry - ensure node exists
            ensureNode(parts);
        } else {
            // file entry -> attach to parent folder
            const fileName = parts[parts.length - 1];
            const parent = parts.slice(0, -1);
            if (parent.length === 0) {
                // top-level file — store under a root pseudo-folder (choose '.' or similar)
                const rootNode = ensureNode(['.']);
                rootNode.files.push(fileName);
            } else {
                const node = ensureNode(parent);
                node.files.push(fileName);
            }
        }
    }

    return tree;
}

// Example
const input = [
  'folderA',
  'folderA\\fileA',
  'folderA\\fileB',
  'folderA\\folderB',
  'folderA\\folderB\\fileAA',
  'folderA\\folderB\\fileAB',
];

console.log(JSON.stringify(pathsToFolderTree(input), null, 2));
/* output:
{
  "folderA": {
    "files": [
      "fileA",
      "fileB"
    ],
    "children": {
      "folderB": {
        "files": [
          "fileAA",
          "fileAB"
        ],
        "children": {}
      }
    }
  }
}
*/
