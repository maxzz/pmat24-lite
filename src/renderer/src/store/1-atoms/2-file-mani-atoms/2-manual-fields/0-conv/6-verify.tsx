import { type PrimitiveAtom, type Getter, type Setter } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type MFormCnt, type VerifyError } from "../../9-types";
import { type ManualFieldState } from "../9-types";
import { getAllAtomValuesForValidate, getChunkValuesForValidate, type RowInputStateUuid } from "./6-verify-state-access";

export function getFormVerifyErrors(cnt: MFormCnt, formIdx: FormIdx, get: Getter, set: Setter): VerifyError[] {

    const tab = formIdx === FormIdx.login ? 'login' : 'cpass';

    const chunks = get(cnt.chunksAtom);

    if (!hasFieldChunk(chunks)) {
        return [{ error: 'The action list must contain at least one "Field" action.', tab }]; //TODO: it's better to dissmis this error when the user adds a field
    }

    const toValidate: RowInputStateUuid[] = getAllAtomValuesForValidate(chunks, get);

    const involvedChunkNumbers = new Map<PrimitiveAtom<boolean>, number>();

    const rv: VerifyError[] = toValidate
        .map(
            (item) => {
                const atomValue: RowInputStateUuid = item;
                const actionUuid = atomValue.uuid;
                const error = atomValue.validate?.(atomValue.data);

                if (error) {
                    const chunkNum = involvedChunkNumbers.get(atomValue.chunk.hasErrorAtom);
                    involvedChunkNumbers.set(atomValue.chunk.hasErrorAtom, chunkNum === undefined ? 1 : chunkNum + 1);
                }

                const rv: VerifyError | undefined = error ? { error, tab, actionUuid } : undefined;
                return rv;
            }
        ).filter(Boolean);

    involvedChunkNumbers.forEach(
        (num, errorAtom) => {
            set(errorAtom, true);
        }
    );

    return rv;
}

function hasFieldChunk(chunks: ManualFieldState.Ctx[]): boolean {
    const rv = chunks.some(
        (chunk) => {
            return chunk.type === 'fld';
        }
    );
    return rv;
}

//TODO: this was for initial validation, but not need anymore
export function isChunkInvalid(chunk: ManualFieldState.Ctx, get: Getter, set: Setter): boolean {
    const toValidate: RowInputStateUuid[] = getChunkValuesForValidate(chunk, get);

    const err = toValidate.some(
        (item) => {
            const error = item.validate?.(item.data);
            return error;
        }
    );

    return err;
}
