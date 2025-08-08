import { atom } from "jotai";
import { type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms/9-types";

export const doSetInUseAtom = atom(
    null,
    (get, set, { fileUsCtx, inUse }: { fileUsCtx: FileUsCtx, inUse: boolean; }) => {
        set(fileUsCtx.fileUs.maniInUseAtom, inUse);
    },
);

export const doSetInTestAtom = atom(
    null,
    (get, set, { fileUsCtx, inTest }: { fileUsCtx: FileUsCtx, inTest: boolean; }) => {
        set(fileUsCtx.fileUs.maniInTestAtom, inTest);
    },
);
