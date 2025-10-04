import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { ManualFieldConv } from "@/store/2-file-mani-atoms/2-manual-fields";

export function getVerifyErrors_ManualForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
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
