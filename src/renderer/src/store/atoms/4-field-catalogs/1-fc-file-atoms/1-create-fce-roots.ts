import { type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type FceRoots } from "../9-types-fc";
import { createEmptyFceRoot, fieldCatToFceRoot } from "./8-fc-file-to-fc-root";
import { finalizeFileContent } from "@/store/store-utils";

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
                roots[fpath] = fieldCatToFceRoot(fileUs.fileCnt, fileUs.parsedSrc.fcat);
            }
        }
    );

    // 2. For each manifest file assign FceRoot

    fileUsItems.forEach(
        (fileUs) => {
            if (!fileUs.parsedSrc.fcat) {
                const fpath = fileUs.fileCnt.fpath || 'root';
                if (!roots[fpath]) {
                    roots[fpath] = createEmptyFceRoot(fileUs.fileCnt);
                }
                fileUs.fceRoot = roots[fpath];
            }
        }
    );

    console.log('createFldCatRoots', roots);

    return roots;
}

export function createFldCatRoot(fileUsItems: FileUs[]) {

    const rootFcFileUs = fileUsItems.find((fileUs) => fileUs.parsedSrc.fcat && fileUs.fileCnt.fname === 'field_catalog.dpn' && fileUs.fileCnt.fpath === '');

    let rootFc = createEmptyFceRoot(rootFcFileUs?.fileCnt);


}
