import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { ManualFieldConv } from "@/store/2-file-mani-atoms/2-manual-fields";

export function getVerifyErrors_ManualForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.manual) {
        return;
    }

    const rv: VerifyError[] = ManualFieldConv.getFormVerifyErrors(formCtx.manual, formIdx, getset);
    return rv.length ? rv : undefined;
};
