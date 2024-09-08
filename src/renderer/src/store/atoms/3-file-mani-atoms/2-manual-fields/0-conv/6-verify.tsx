import { type PrimitiveAtom, type Getter, type Setter } from "jotai";
import { type MFormCtx, type VerifyError } from "../../9-types";
import { type ManualFieldState } from "../9-types";
import { FormIdx } from "@/store/store-types";
import { getAllAtomValuesForValidate, getChunkValuesForValidate, type RowInputStateUuid } from "./6-verify-state-access";

export function getFormVerifyErrors(ctx: MFormCtx, formIdx: FormIdx, get: Getter, set: Setter): VerifyError[] {

    const chunks = get(ctx.chunksAtom);

    const toValidate: RowInputStateUuid[] = getAllAtomValuesForValidate(chunks, get);

    const tab = formIdx === FormIdx.login ? 'login' : 'cpass';

    const involvedChunkNumbers = new Map<PrimitiveAtom<boolean>, number>();

    const rv: VerifyError[] = toValidate
        .map(
            (item) => {
                const atomValue: RowInputStateUuid = item;
                const actionUuid = atomValue.uuid;
                const error = atomValue.validate?.(atomValue.data);

                if (error) {
                    const chunkNum = involvedChunkNumbers.get(atomValue.chunk.hasErrorAtom);
                    if (chunkNum === undefined) {
                        involvedChunkNumbers.set(atomValue.chunk.hasErrorAtom, 1);
                    } else {
                        involvedChunkNumbers.set(atomValue.chunk.hasErrorAtom, chunkNum + 1);
                    }
                }

                // console.log(`error: '${error}'`, `tab='${tab}' actionUuid=${actionUuid}`);

                const rv: VerifyError | undefined = error ? { error, tab, actionUuid } : undefined;
                return rv;
            }
        ).filter(Boolean);

    involvedChunkNumbers.forEach(
        (num, atom) => {
            set(atom, true);
            console.log(`num: '${num}'`, `tab='${tab}' atom=${atom}`);
        }
    );

    return rv;
}

export function isChunkInvalid(chunk: ManualFieldState.ForAtoms, get: Getter, set: Setter): boolean {
    const toValidate: RowInputStateUuid[] = getChunkValuesForValidate(chunk, get);

    const err = toValidate.some(
        (item) => {
            const error = item.validate?.(item.data);
            return error;
        }
    );

    return err;
}
