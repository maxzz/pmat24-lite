import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { FormIdx } from "@/store/manifest";
import { ManualFieldConv } from "../../../../2-manual-fields";

export function manualFormsVerifyErrors([login, cpass]: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const rv: VerifyError[] = [];

    if (login?.manual) {
        const errors = ManualFieldConv.getFormVerifyErrors(login.manual, FormIdx.login, getset);
        if (errors.length) {
            rv.push(...errors);
        }
    }

    if (cpass?.manual) {
        const errors = ManualFieldConv.getFormVerifyErrors(cpass.manual, FormIdx.cpass, getset);
        if (errors.length) {
            rv.push(...errors);
        }
    }

    return rv.length ? rv : undefined;
};
