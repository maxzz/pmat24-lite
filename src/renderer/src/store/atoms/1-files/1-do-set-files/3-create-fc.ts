import { FileUs } from "@/store/store-types";
import { FceItem, FceRoots } from "../../4-field-catalogs";
import { fieldCatToFceRoot } from "../../4-field-catalogs/3-fc-file-to-fc-root";
import { atom } from "jotai";

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
