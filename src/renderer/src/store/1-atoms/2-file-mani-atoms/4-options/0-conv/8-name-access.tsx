import { atom, type PrimitiveAtom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type RowInputState } from "@/ui";
import { type ManiAtoms } from "../../9-types";
import { type FileUsAtom } from "@/store/store-types";

/**
 * The same as `get(fileUs.maniAtomsAtom)?.[FormIdx.login]?.options.p1General.nameAtom`
 * ```
 * const maniAtoms = get(fileUs.maniAtomsAtom);
 * const login = maniAtoms?.[FormIdx.login];
 * if (!login) {
 *     return null;
 * }
 * const loginCtx: OFormContextProps | undefined = { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };
 * const { nameAtom } = loginCtx.oAllAtoms.options.p1General;
 * ```
 */
export function getManiNameAtom(maniAtoms: ManiAtoms | null): PrimitiveAtom<RowInputState> | undefined {
    const rv = maniAtoms?.[FormIdx.login]?.options.p1General?.nameAtom;
    return rv;
}

export const getManiDispNameAtomAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom | undefined): PrimitiveAtom<RowInputState> | undefined => {
        const fileUs = fileUsAtom ? get(fileUsAtom) : undefined;
        if (!fileUs || !fileUs.maniAtomsAtom) {
            return;
        }

        const rv = getManiNameAtom(get(fileUs.maniAtomsAtom));
        return rv;
    },
);
