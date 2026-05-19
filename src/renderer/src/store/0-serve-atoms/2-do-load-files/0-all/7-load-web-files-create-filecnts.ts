import { proxySet } from "valtio/utils";
import { uuid } from "@/store/8-manifest";
import { isAllowedExt } from "@/utils";
import { textFileReaderPromisify } from "@/store/store-utils";
import { type FileContent, pmAllowedToOpenExt } from "@shared/ipc-types";
import { type OpenItem } from "./9-types";

export async function loadWebFilesAndCreateFileContents(openItems: OpenItem[]): Promise<FileContent[]> {
    const rv: FileContent[] = [];

    const allowedItems = stripNoiseItems(openItems);

    for (const [idx, openItem] of allowedItems.entries()) {
        if (!openItem.fileWeb) {
            console.error('Empty entry or file', openItem);
            continue;
        }

        try {
            const newItem: FileContent = {
                unid: uuid.asRelativeNumber(),
                idx,
                fname: openItem.fname,
                fpath: openItem.fpath,
                fmodi: openItem.fileWeb.lastModified,
                size: openItem.fileWeb.size,
                rawLoaded: '',

                newFile: false,
                newAsManual: false,
                fromMain: false,

                webFsItem: openItem.webFsItem,

                notOur: openItem.notOur,
                failed: false,

                changesSet: proxySet<string>(),
            };

            try {
                newItem.rawLoaded = openItem.notOur ? '' : await textFileReaderPromisify(openItem.fileWeb);
            } catch (error) {
                newItem.rawLoaded = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
            }

            rv.push(newItem);
        } catch (error) {
            console.error('Error processing drop item:', error, openItem);
        }
    }//for

    return rv;
}

/**
 * Returns items to process: drops disallowed folder depths and marks extension-blocked items as notOur.
 * When fpath is in "root included" form, root-level files have a single component that prefixes
 * allowed subfolders; detect those prefixes so random names (e.g. "other") are not treated as root.
 */
function stripNoiseItems(items: OpenItem[]): OpenItem[] {
    const rootPrefixes = new Set<string>();

    for (const item of items) {
        const parts = normFpath(item.fpath).split('/');

        if (parts.length === 2 && ABC_SUBFOLDERS.has(parts[1].toLowerCase())) {
            rootPrefixes.add(parts[0].toLowerCase());
        }
    }

    const allowedSingleComponents = new Set<string>([...ABC_SUBFOLDERS, ...rootPrefixes]);
    
    const allowedItems = items.filter(
        (item) => isAllowedFolderDepth(item.fpath, allowedSingleComponents)
    );

    allowedItems.forEach(
        (openItem) => openItem.notOur = !isAllowedExt(openItem.fname, pmAllowedToOpenExt)
    );

    return allowedItems;
}

/**
 * Returns true for allowed folder depths only:
 * - root-level files: `fpath === ""` (no folder path) OR the detected root-prefix component
 * - files directly under `a`/`b`/`c` (case-insensitive) one-level deep
 *   - root included form: `RootFolder/a|b|c` (2 components)
 *   - root omitted form: `a|b|c` (1 component)
 */
function isAllowedFolderDepth(fpath: string, allowedSingleComponents: Set<string>): boolean {
    const nfpath = normFpath(fpath);
    if (!nfpath) return true; // root-level file (no folder path)

    const parts = nfpath.split('/');

    // One component:
    // - in "root omitted" form: it's the subfolder name => must be a/b/c
    // - in "root included" form: it's the root folder name => allow only if we can detect it prefixes root/a|b|c
    if (parts.length === 1) {
        return allowedSingleComponents.has(parts[0].toLowerCase());
    }

    // Two components:
    // "root included" form => RootFolder/a|b|c
    if (parts.length === 2) {
        return ABC_SUBFOLDERS.has(parts[1].toLowerCase()); // must be A, B, or C
    }

    return false; // deeper than one level: skip
}

const ABC_SUBFOLDERS = new Set(['a', 'b', 'c']);

function normFpath(fpath: string): string {
    return (fpath || '')
        .replace(/\\/g, '/')             // be tolerant to either slash style
        .replace(/^\/+|\/+$/g, '');    // trim leading/trailing slashes
}
