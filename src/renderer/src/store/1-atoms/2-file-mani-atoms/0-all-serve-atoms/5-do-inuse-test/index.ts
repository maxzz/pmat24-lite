import { atom } from "jotai";
import { type FileUsCtx } from "../../9-types";

export const doInUseAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx, isOn: boolean) => {
        set(fileUsCtx.fileUs.maniInUseAtom, isOn);
    },
);

export const doInUseTestAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx, isOn: boolean) => {
        set(fileUsCtx.fileUs.maniInTestAtom, isOn);
    },
);
