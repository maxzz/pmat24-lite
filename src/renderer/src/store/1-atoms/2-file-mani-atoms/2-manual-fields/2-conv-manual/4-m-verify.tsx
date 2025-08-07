import { FormIdx } from "@/store/manifest";
import { type MFormCnt, type VerifyError } from "../../9-types";
import { type ManualFieldState } from "../9-types";
import { type RowInputState } from "@/ui/local-ui/1-input-validate";
import { getDlyChunkValues, getKbdChunkValues, getPosChunkValues } from "./2-m-from-atoms";

export function getFormVerifyErrors(cnt: MFormCnt, formIdx: FormIdx, { get, set }: GetSet): VerifyError[] {
    const tab = formIdx === FormIdx.login ? 'login' : 'cpass';

    const chunks = get(cnt.chunksAtom);

    const hasAtLeastOneFieldChunk = chunks.some((chunk) => chunk.type === 'fld');
    if (!hasAtLeastOneFieldChunk) {
        return [{ error: 'The action list must contain at least one "Field" action.', tab }]; //TODO: it's better to dissmis this error when the user adds a field
    }

    const toValidate: RowInputStateUuid[] = getAllAtomValuesForValidate(chunks, get);

    const involvedChunkNumbers = new Map<PA<boolean>, number>();

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

type RowInputStateUuid = RowInputState & { uuid: number; chunk: ManualFieldState.Ctx; };

function getChunkRawInputStatesForValidate(chunk: ManualFieldState.Ctx, get: Getter): RowInputStateUuid[] {
    const rv: RowInputState[] = [];
    switch (chunk.type) {
        case "kbd": {
            const { char, repeat, shift, ctrl, alt } = getKbdChunkValues(chunk, get);
            rv.push(char, repeat, shift, ctrl, alt);
            break;
        }
        case "pos": {
            const { x, y, units, res } = getPosChunkValues(chunk, get);
            rv.push(x, y, units, res);
            break;
        }
        case "dly": {
            const { n } = getDlyChunkValues(chunk, get);
            rv.push(n);
            break;
        }
        case "fld": {
            break;
        }
    }
    return rv.map((item) => ({ ...item, uuid: chunk.uid5, chunk }));
}

function getAllAtomValuesForValidate(chunks: ManualFieldState.Ctx[], get: Getter): RowInputStateUuid[] {
    const rv = chunks.map((chunk) => getChunkRawInputStatesForValidate(chunk, get)).flat();
    return rv;
}

//TODO: this was for initial validation, but not need anymore
export function isChunkInvalid(chunk: ManualFieldState.Ctx, { get }: GetOnly): boolean {
    const toValidate: RowInputStateUuid[] = getChunkRawInputStatesForValidate(chunk, get);

    const error = toValidate.some((item) => item.validate?.(item.data));
    return error;
}
