import { atom } from "jotai";
import { type ManiAtoms, type VerifyError } from "../../9-types";
import { OptionsConv } from "../../4-options";
import { FormIdx } from "@/store/store-types";

export const doVerifyOptionsAtom = atom(null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms; }): VerifyError[] | undefined => {
        const [login, cpass] = maniAtoms;

        const rv: VerifyError[] = []; 

        if (login) {
            const errors = OptionsConv.getVerifyErrors(login.options, FormIdx.login, get, set);
            if (errors.length) {
                rv.push(...errors);
            }
        }

        if (cpass) {
            const errors = OptionsConv.getVerifyErrors(cpass.options, FormIdx.cpass, get, set);
            if (errors.length) {
                rv.push(...errors);
            }
        }

        return rv.length ? rv : undefined;
    }
);