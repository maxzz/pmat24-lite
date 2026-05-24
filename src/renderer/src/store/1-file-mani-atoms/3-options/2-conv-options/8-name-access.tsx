import { atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type RowInputStateAtom } from "@/ui/local-ui";
import { type ManiAtoms } from "../../9-types";
import { type FileUsAtom } from "@/store/store-types";

export const getManiDispNameAtomAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom | undefined): RowInputStateAtom | undefined => {
        const fileUs = fileUsAtom && get(fileUsAtom);
        const rv = fileUs?.maniAtomsAtom && pathToManiNameAtom(get(fileUs.maniAtomsAtom));
        return rv;
    },
);

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
export function pathToManiNameAtom(maniAtoms: ManiAtoms | null): RowInputStateAtom | undefined {
    const rv = maniAtoms?.[FormIdx.login]?.options.p1General?.nameAtom;
    return rv;
}
