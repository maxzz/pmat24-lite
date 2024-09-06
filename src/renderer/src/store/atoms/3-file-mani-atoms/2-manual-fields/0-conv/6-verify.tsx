import { type PrimitiveAtom, type Getter, type Setter } from "jotai";
import { type RowInputState } from "@/ui";
import { FormIdx } from "@/store/store-types";
import { MFormCtx, VerifyError } from "../../9-types";

export function getFormVerifyErrors(atoms: MFormCtx, formIdx: FormIdx, get: Getter, set: Setter): VerifyError[] {

    const toValidate: Record<string, PrimitiveAtom<RowInputState>> = {}
    
    const rv: VerifyError[] = Object.entries(toValidate)
        .map(
            ([key, atom]) => {
                const atomValue: RowInputState = get(atom);
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
