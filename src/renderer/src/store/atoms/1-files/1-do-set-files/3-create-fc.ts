import { FileUs } from "@/store/store-types";
import { FceRoots } from "../../4-field-catalogs";
import { fieldCatToFceRoot } from "../../4-field-catalogs/3-fc-file-to-fc-root";

export function createFldCatRoots(fileUsItems: FileUs[]): FceRoots {
    const rv: FceRoots = {};

    fileUsItems.forEach(
        (fileUs) => {
            const fpath = fileUs.fileCnt.fpath || 'root';

            if (fileUs.parsedSrc.fcat) {
                rv[fpath] = fieldCatToFceRoot(fileUs.parsedSrc.fcat);
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
                    descriptor: {},
                    items: [],
                };
            }

            fileUs.fceRoot = rv[fpath];
        }
    );

    return rv;
}
