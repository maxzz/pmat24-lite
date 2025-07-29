import { atom } from "jotai";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { FormIdx } from "@/store/manifest";
import { ManualFieldConv } from "../../../../2-manual-fields";

export const doVerifyManualFormAtom = atom(null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms; }): VerifyError[] | undefined => {
        const [login, cpass] = maniAtoms;

        const rv: VerifyError[] = []; 

        if (login?.manual) {
            const errors = ManualFieldConv.getFormVerifyErrors(login.manual, FormIdx.login, get, set);
            if (errors.length) {
                rv.push(...errors);
            }
        }

        if (cpass?.manual) {
            const errors = ManualFieldConv.getFormVerifyErrors(cpass.manual, FormIdx.cpass, get, set);
            if (errors.length) {
                rv.push(...errors);
            }
        }

        return rv.length ? rv : undefined;
    }
);
