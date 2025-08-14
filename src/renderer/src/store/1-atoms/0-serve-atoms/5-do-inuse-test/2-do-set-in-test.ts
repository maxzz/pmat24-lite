import { atom } from "jotai";
import { errorToString } from "@/utils";
import { toast } from "sonner";
import { type FileUsCtx, fileUsChanges } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { moveByInTestFileSystem } from "../7-file-system-manipulation";

// export const doSetInUseAtom = atom(
//     null,
//     (get, set, { fileUsCtx, inUse }: { fileUsCtx: FileUsCtx, inUse: boolean; }) => {
//         set(fileUsCtx.fileUs.maniInUseAtom, inUse);
//     },
// );

export const doSetInTestAtom = atom(
    null,
    (get, set, { fileUsCtx, inTest }: { fileUsCtx: FileUsCtx, inTest: boolean; }) => {
        if (fileUsChanges.hasAny({ fileUs: fileUsCtx.fileUs })) {
            set(fileUsCtx.fileUs.maniInTestAtom, inTest);
            return; // Nothing to do before file saved
        }

        const inTestNow = get(fileUsCtx.fileUs.maniInTestAtom);
        if (inTestNow === inTest) {
            return; // Nothing to do
        }

        try {
            moveByInTestFileSystem(fileUsCtx.fileUs, fileUsCtx.fileUs.fileCnt.rawLoaded, fileUsCtx.fileUs.fileCnt.fname, inTest, { get, set });

            set(fileUsCtx.fileUs.maniInTestAtom, inTest); // Set only if file moved
        } catch (error) {
            console.error('Error moving file', error);
            toast.error(`Error setting test mode: ${errorToString(error)}`);
        }
    },
);
