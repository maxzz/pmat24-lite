import { atom } from "jotai";
import { errorToString } from "@/utils";
import { toast } from "sonner";
import { type FileUsCtx, fileUsChanges } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { moveByInTestFileSystem } from "../7-file-system-manipulation";

export const doSetInTestAtom = atom(
    null,
    (get, set, { fileUsCtx, inTest }: { fileUsCtx: FileUsCtx, inTest: boolean; }) => {
        const fileUs = fileUsCtx.fileUs;

        if (fileUsChanges.hasAny({ fileUs })) {
            set(fileUsCtx.fileUs.maniInTestAtom, inTest);
            return; // Nothing to do before file saved
        }

        const inTestNow = get(fileUs.maniInTestAtom);
        if (inTestNow === inTest) {
            return;
        }

        try {
            moveByInTestFileSystem(fileUs, inTest, { get, set });

            set(fileUsCtx.fileUs.maniInTestAtom, inTest); // Update inTest only if file moved
        } catch (error) {
            toast.error(`Error setting test mode: ${errorToString(error)}`);
        }
    },
);

// export const doSetInUseAtom = atom(
//     null,
//     (get, set, { fileUsCtx, inUse }: { fileUsCtx: FileUsCtx, inUse: boolean; }) => {
//         set(fileUsCtx.fileUs.maniInUseAtom, inUse);
//     },
// );
