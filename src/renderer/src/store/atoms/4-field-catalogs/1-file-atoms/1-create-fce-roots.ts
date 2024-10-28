import { type FileUs } from "@/store/store-types";
import { type FceRoots } from "../9-types-fc";
import { createEmptyFceRoot, fieldCatToFceRoot } from "./8-fc-file-to-fc-root";

export function createFldCatRoots(fileUsItems: FileUs[]): FceRoots {
    const roots: FceRoots = {};

    // 1. For each Field Catalog file create a FceRoot

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
                    roots[fpath] = createEmptyFceRoot();
                }
                fileUs.fceRoot = roots[fpath];
            }
        }
    );

    return roots;
}
