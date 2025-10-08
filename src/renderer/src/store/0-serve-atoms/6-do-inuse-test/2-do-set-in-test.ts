import { atom } from "jotai";
import { errorToString } from "@/utils";
import { toaster } from "@/ui/local-ui";
import { type FileUsCtx, fileUsChanges } from "@/store/2-file-mani-atoms/9-types";
import { inTest_Set } from "./8-in-test-commands";
import { moveByInTestFileSystem } from "../7-file-system-manipulation";

export const doSetManiInTestAtom = atom(
    null,
    async (get, set, { fileUsCtx, inTest }: { fileUsCtx: FileUsCtx, inTest: boolean; }) => {
        const fileUs = fileUsCtx.fileUs;

        if (fileUsChanges.hasAny({ fileUs })) { // Nothing to do before file saved
            set(fileUs.maniInTestAtom, inTest);
            return;
        }

        const inTestNow = get(fileUs.maniInTestAtom);
        if (inTestNow === inTest) {
            return;
        }

        try {
            await moveByInTestFileSystem(fileUs, inTest, { get, set });

            set(fileUs.maniInTestAtom, inTest); // Update inTest only if file moved

            await inTest_Set({ fileUs, inTest, deleteFile: false });
        } catch (error) {
            toaster.error(`Error setting test mode: ${errorToString(error)}`);
        }
    },
);

// export const doSetManiInUseAtom = atom(
//     null,
//     (get, set, { fileUsCtx, inUse }: { fileUsCtx: FileUsCtx, inUse: boolean; }) => {
//         set(fileUsCtx.fileUs.maniInUseAtom, inUse);
//     },
// );

//TODO: when file is deleted then we need to clear it from inUse cache
//TODO: when file is saved then we need to set/update it to inUse cache
//TODO: we need to connect quit to clear inUse cache

//TODO: show inTest toast and next to toggle message when failed to move file
