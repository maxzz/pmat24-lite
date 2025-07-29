import { type Getter, type Setter } from "jotai";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { FormOptionsConv } from "../../../../4-options";
import { FormIdx } from "@/store/manifest";

export function optionsVerifyErrors(get: Getter, set: Setter, { maniAtoms }: { maniAtoms: ManiAtoms; }): VerifyError[] | undefined {
    const rv: VerifyError[] = [];
    const [login, cpass] = maniAtoms;

    if (login) {
        const errors = FormOptionsConv.getVerifyErrors(login.options, FormIdx.login, get, set);
        if (errors.length) {
            rv.push(...errors);
        }
    }

    if (cpass) {
        const errors = FormOptionsConv.getVerifyErrors(cpass.options, FormIdx.cpass, get, set);
        if (errors.length) {
            rv.push(...errors);
        }
    }

    return rv.length ? rv : undefined;
}
