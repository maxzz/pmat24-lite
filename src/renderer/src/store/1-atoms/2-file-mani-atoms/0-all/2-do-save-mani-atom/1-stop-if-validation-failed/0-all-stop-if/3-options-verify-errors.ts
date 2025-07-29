import { type GetSet } from "@/utils";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { FormOptionsConv } from "../../../../4-options";
import { FormIdx } from "@/store/manifest";

export function optionsVerifyErrors([login, cpass]: ManiAtoms, {get,set}: GetSet): VerifyError[] | undefined {
    const rv: VerifyError[] = [];

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
