import { atom } from "jotai";
import { ManiAtoms } from "../../9-types";
import { OptionsConv } from "../../4-options";
import { FormIdx } from "@/store/store-types";

export const verifyOptionsAtom = atom(null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms; }): string[] | undefined => {
        
        const [login, cpass] = maniAtoms;
        if (!login && !cpass) {
            return;
        }

        const rv: string[] = []; 

        if (login) {
            const errors = OptionsConv.verifyAtoms(login.optionsAtoms, FormIdx.login, get, set);
            if (errors.length) {
                rv.push(...errors);
            }
        }

        if (cpass) {
            const errors = OptionsConv.verifyAtoms(cpass.optionsAtoms, FormIdx.cpass, get, set);
            if (errors.length) {
                rv.push(...errors);
            }
        }

        return rv.length ? rv : undefined;
    }
);
