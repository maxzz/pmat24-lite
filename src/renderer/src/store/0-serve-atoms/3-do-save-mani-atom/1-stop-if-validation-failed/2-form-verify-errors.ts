import { FieldTyp, FormIdx } from "@/store/manifest";
import { type ManiAtoms, type FieldRowCtx, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { getVerifyErrors_FromManualForm } from "./3-form-manual-verify-errors";
import { link } from "fs";
import { getTotalCountErrorMessage, TotalCount } from "./7-get-total-count-error-message";

// Manual form

export function getVerifyErrors_ManualForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.manual) {
        return;
    }

    const rv: VerifyError[] = getVerifyErrors_FromManualForm(formCtx.manual, formIdx, getset);
    return rv;
};

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

function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, { get }: GetSet): TotalCount {
    const rv: TotalCount = {
        useItAny: 0,
        useItPsw: 0,
        linkedCur: 0,
        linkedNew: 0,
    };

    rowCtxs?.forEach(
        (fieldRowCtx) => {
            const useIt = get(fieldRowCtx.useItAtom);
            if (useIt) {
                rv.useItAny++;

                const isPsw = get(fieldRowCtx.typeAtom) === FieldTyp.psw;
                if (isPsw) {
                    rv.useItPsw++;

                    const rfield = get(fieldRowCtx.rfieldAtom);
                    if (rfield) {
                        const isCurrent = rfield === 'in';
                        const isNew = rfield === 'out';

                        if (isCurrent || isNew) {

                            const isLinked = !!get(fieldRowCtx.rfieldUuidAtom);
                            if (isLinked) {
                                if (isCurrent) {
                                    rv.linkedCur++;
                                } else if (isNew) {
                                    rv.linkedNew++;
                                }
                            }
                        }
                    }
                }

            }
        }
    );

    return rv;
    //TODO: We can remove the button elements if the form is intended for websites. Buttons were added for old IE submit method.
}
