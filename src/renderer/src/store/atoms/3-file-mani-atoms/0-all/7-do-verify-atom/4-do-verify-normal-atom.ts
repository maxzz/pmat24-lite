import { atom } from "jotai";
import { type ManiAtoms, type VerifyError } from "../../9-types";

export const doVerifyNormalFormAtom = atom(null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms; }): VerifyError[] | undefined => {
        return;
    }
);
