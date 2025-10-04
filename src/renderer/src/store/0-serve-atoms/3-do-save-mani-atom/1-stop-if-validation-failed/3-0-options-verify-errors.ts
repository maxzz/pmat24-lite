import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { getOptionsVerifyErrors_OfMain } from "./3-1-options-verify";

export function optionsFormVerifyErrors(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const rv: VerifyError[] = [];

    const formCtx = maniAtoms[formIdx];

    if (formCtx) {
        const errors = getOptionsVerifyErrors_OfMain(formCtx.options, formIdx, getset);
        if (errors.length) {
            rv.push(...errors);
        }
    }

    return rv.length ? rv : undefined;
}
