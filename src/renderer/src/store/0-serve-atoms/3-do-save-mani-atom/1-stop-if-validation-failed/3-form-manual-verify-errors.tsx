import { FormIdx } from "@/store/manifest";
import { FieldRowCtx, type MFormCnt, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { type RowInputStateUuid, getChunkRawInputStatesForValidate } from "@/store/2-file-mani-atoms/2-manual-fields/2-conv-manual/2-m-from-atoms";
import { getTotalCountError } from "./7-get-total-count-error-message";

export function getVerifyErrors_FromManualForm(cnt: MFormCnt, formIdx: FormIdx, { get, set }: GetSet): VerifyError[] {
    const tab = formIdx === FormIdx.login ? 'login' : 'cpass';

    const chunks = get(cnt.chunksAtom);

    const hasAtLeastOneFieldChunk = chunks.some((chunk) => chunk.type === 'fld');
    if (!hasAtLeastOneFieldChunk) {
        return [{ error: 'The action list must contain at least one "Field" action.', tab }]; //TODO: it's better to dissmis this error when the user adds a field
    }

    const toValidate: RowInputStateUuid[] = chunks.map(
        (chunk, idx) => getChunkRawInputStatesForValidate(chunk, idx, get)
    ).flat();

    const chunksToSetErrorMap = new Map<PA<boolean>, number>();

    const rv: VerifyError[] = toValidate
        .map(
            (chunkRow: RowInputStateUuid) => {
                const error = chunkRow.validate?.(chunkRow.data);
                if (error) {
                    const chunkNum = chunksToSetErrorMap.get(chunkRow.chunk.hasErrorAtom);
                    chunksToSetErrorMap.set(chunkRow.chunk.hasErrorAtom, chunkNum === undefined ? 1 : chunkNum + 1);
                    const rv: VerifyError = {
                        error,
                        tab,
                        actionUuid: chunkRow.uuid,
                        rowIdx: chunkRow.rowIdx,
                    };
                    return rv;
                }
            }
        ).filter(Boolean);

    chunksToSetErrorMap.forEach(
        (num: number, errorAtom: PA<boolean>) => set(errorAtom, true)
    );

    if (!rv.length) {
        const ctxs: FieldRowCtx[] = chunks.map((chunk) => chunk.type === 'fld' ? chunk.rowCtx : undefined).filter(Boolean);
        
        const errors = getTotalCountError(ctxs, formIdx, get);
        if (errors) {
            rv.push(...errors);
        }
    }

    return rv;
}
