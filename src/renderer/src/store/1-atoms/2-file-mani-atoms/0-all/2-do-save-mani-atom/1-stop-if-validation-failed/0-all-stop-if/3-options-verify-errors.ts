import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { FormOptionsConv } from "../../../../4-options";
import { FormIdx } from "@/store/manifest";

export function optionsFormVerifyErrors([login, cpass]: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const rv: VerifyError[] = [];

    const formCtx = formIdx === FormIdx.login ? login : formIdx === FormIdx.cpass ? cpass : undefined;

    if (formCtx) {
        const errors = FormOptionsConv.getVerifyErrors(formCtx.options, formIdx, getset);
        if (errors.length) {
            rv.push(...errors);
        }
    }

    return rv.length ? rv : undefined;
}
