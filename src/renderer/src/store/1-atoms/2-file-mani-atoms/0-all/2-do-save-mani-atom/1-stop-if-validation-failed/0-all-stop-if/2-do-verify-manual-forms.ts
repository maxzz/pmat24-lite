import { type Getter, type Setter } from "jotai";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { FormIdx } from "@/store/manifest";
import { ManualFieldConv } from "../../../../2-manual-fields";

export function manualFormsVerifyErrors(get: Getter, set: Setter, { maniAtoms }: { maniAtoms: ManiAtoms; }): VerifyError[] | undefined {
    const rv: VerifyError[] = [];
    const [login, cpass] = maniAtoms;

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
};
