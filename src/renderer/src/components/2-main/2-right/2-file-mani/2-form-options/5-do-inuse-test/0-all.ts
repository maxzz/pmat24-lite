import { atom } from "jotai";
import { type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms/9-types";

export const doSetInUseAtom = atom(
    null,
    (get, set, { fileUsCtx, isOn }: { fileUsCtx: FileUsCtx, isOn: boolean; }) => {
        set(fileUsCtx.fileUs.maniInUseAtom, isOn);
    },
);

export const doSetInTestAtom = atom(
    null,
    (get, set, { fileUsCtx, isOn }: { fileUsCtx: FileUsCtx, isOn: boolean; }) => {
        set(fileUsCtx.fileUs.maniInTestAtom, isOn);
    },
);
