import { type FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { getVerifyErrors_FromManualForm } from "./3-form-manual-verify-errors";
import { getTotalCountErrorMessage, totalFieldsInUse } from "./7-get-total-count-error-message";

// Normal form

export function getVerifyErrors_NormalForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.normal) {
        return;
    }

    const totalCount = totalFieldsInUse(formCtx.normal.rowCtxs, getset);
    const rv = getTotalCountErrorMessage(totalCount, formIdx);
    return rv;
}

// Manual form

export function getVerifyErrors_ManualForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.manual) {
        return;
    }

    const rv: VerifyError[] = getVerifyErrors_FromManualForm(formCtx.manual, formIdx, getset);
    return rv;
};
