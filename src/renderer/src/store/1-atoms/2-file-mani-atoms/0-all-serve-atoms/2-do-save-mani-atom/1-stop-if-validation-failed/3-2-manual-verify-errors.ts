import { type ManiAtoms, type VerifyError } from "../../../9-types";
import { FormIdx } from "@/store/manifest";
import { ManualFieldConv } from "../../../2-manual-fields";

export function manualFormVerifyErrors(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const rv: VerifyError[] = [];

    const formCtx = maniAtoms[formIdx];

    if (formCtx?.manual) {
        const errors = ManualFieldConv.getFormVerifyErrors(formCtx.manual, formIdx, getset);
        if (errors.length) {
            rv.push(...errors);
        }
    }

    return rv.length ? rv : undefined;
};
