import { FormIdx } from "@/store/manifest";
import { type MFormCnt, type VerifyError } from "../../9-types";
import { type ManualFieldState } from "../9-types";
import { type RowInputStateUuid, getChunkRawInputStatesForValidate } from "./2-m-from-atoms";

export function getFormVerifyErrors(cnt: MFormCnt, formIdx: FormIdx, { get, set }: GetSet): VerifyError[] {
    const tab = formIdx === FormIdx.login ? 'login' : 'cpass';

    const chunks = get(cnt.chunksAtom);

    const hasAtLeastOneFieldChunk = chunks.some((chunk) => chunk.type === 'fld');
    if (!hasAtLeastOneFieldChunk) {
        return [{ error: 'The action list must contain at least one "Field" action.', tab }]; //TODO: it's better to dissmis this error when the user adds a field
    }

    const toValidate: RowInputStateUuid[] = chunks.map((chunk, idx) => getChunkRawInputStatesForValidate(chunk, idx, get)).flat();

    const chunksToSetError = new Map<PA<boolean>, number>();

    const rv: VerifyError[] = toValidate
        .map(
            (chunkRow: RowInputStateUuid) => {
                const error = chunkRow.validate?.(chunkRow.data);
                if (error) {
                    const chunkNum = chunksToSetError.get(chunkRow.chunk.hasErrorAtom);
                    chunksToSetError.set(chunkRow.chunk.hasErrorAtom, chunkNum === undefined ? 1 : chunkNum + 1);
                }

                const rv: VerifyError | undefined = !error ? undefined : { error, tab, actionUuid: chunkRow.uuid, rowIdx: chunkRow.rowIdx, };
                return rv;
            }
        ).filter(Boolean);

    chunksToSetError.forEach(
        (num, errorAtom) => {
            set(errorAtom, true);
        }
    );

    return rv;
}

//TODO: this was for initial validation, but not need anymore
export function isChunkInvalid(chunk: ManualFieldState.Ctx, { get }: GetOnly): boolean {
    const toValidate: RowInputStateUuid[] = getChunkRawInputStatesForValidate(chunk, 0, get); // rowIdx is not important here

    const error = toValidate.some((item) => item.validate?.(item.data));
    return error;
}
