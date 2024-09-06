import { type Getter, type Setter } from "jotai";
import { type RowInputState } from "@/ui";
import { FormIdx } from "@/store/store-types";
import { MFormCtx, VerifyError } from "../../9-types";
import { getAllValidateAtoms } from "./6-verify-state-access";

export function getFormVerifyErrors(atoms: MFormCtx, formIdx: FormIdx, get: Getter, set: Setter): VerifyError[] {

    const chunks = get(atoms.chunksAtom);

    const toValidate: RowInputState[] = getAllValidateAtoms(chunks, get);
    
    const rv: VerifyError[] = Object.entries(toValidate)
        .map(
            ([key, item]) => {
                const atomValue: RowInputState = item;
                const error = atomValue.validate?.(atomValue.data);
                const rv: VerifyError | undefined =
                    error
                        ? {
                            msg: error,
                            tab: 'options',
                        }
                        : undefined;
                return rv;
            }
        ).filter(Boolean);

    return rv;
}
