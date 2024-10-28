import { atom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type FceCtx } from "../2-dialog-atoms";
import { type FceItem, type FceRoots } from "../9-types-fc";
import { fieldCatToFceRoot } from "./8-fc-file-to-fc-root";

export function createFldCatRoots(fileUsItems: FileUs[]): FceRoots {
    const rv: FceRoots = {};

    fileUsItems.forEach(
        (fileUs) => {
            const fpath = fileUs.fileCnt.fpath || 'root';

            if (fileUs.parsedSrc.fcat) {
                rv[fpath] = fieldCatToFceRoot(fileUs.fileCnt, fileUs.parsedSrc.fcat);
            }
        }
    );

    fileUsItems.forEach(
        (fileUs) => {
            const fpath = fileUs.fileCnt.fpath || 'root';

            if (fileUs.parsedSrc.fcat) {
                return;
            }

            if (!rv[fpath]) {
                //TODO: add file entry to files list so user can see it
                rv[fpath] = {
                    fileCnt: fileUs.fileCnt,
                    fceAtomsAtom: atom<FceCtx | null>(null),
                    descriptor: {},
                    items: atom<FceItem[]>([]),
                };
            }

            fileUs.fceRoot = rv[fpath];
        }
    );

    return rv;
}

//TODO: add file entry to files list so user can see it. see above where it says "TODO: add file entry to files list so user can see it"
