import type { FileUs } from "@/store/store-types";
import type { FceRoots } from "../9-types-fc";
import { fieldCatToFceAtoms } from "./4-fc-file-to-fc-atoms";
import { createEmptyFceAtoms } from './3-create-empty-fce-atoms';

// Field catalog should have name "field_catalog.dpn" and should be in the root folder.
// Root "field_catalog.dpn" have impact on the root folder and A/B/C subfolders.
// Other field catalogs should be ignored but it will be possible to edit without updating manifest files.

export function createFldCatRoots(fileUsItems: FileUs[]): FceRoots {
    const roots: FceRoots = {};

    // 1. For each Field Catalog file create a FceRoot.
    fileUsItems.forEach(
        (fileUs) => {
            if (fileUs.parsedSrc.fcat) {
                const fpath = fileUs.fileCnt.fpath || 'root';
                roots[fpath] = fieldCatToFceAtoms(fileUs.fileCnt, fileUs.parsedSrc.fcat);
            }
        }
    );

    // 2. For each manifest file assign FceRoot
    fileUsItems.forEach(
        (fileUs) => {
            if (!fileUs.parsedSrc.fcat) {
                const fpath = fileUs.fileCnt.fpath || 'root';
                if (!roots[fpath]) {
                    roots[fpath] = createEmptyFceAtoms(fileUs.fileCnt);
                }
                fileUs.fceAtoms = roots[fpath];
            }
        }
    );

    console.log('createFldCatRoots', roots);

    return roots;
}
