import { type PrimitiveAtom, type Getter, type Setter } from "jotai";
import { type ManiOptions } from "./9-types";
import { type RowInputState } from "@/ui";
import { FormIdx } from "@/store/store-types";
import { VerifyError } from "../../9-types";

export function getVerifyErrors(atoms: ManiOptions.FormOptionsAtoms, formIdx: FormIdx, get: Getter, set: Setter): VerifyError[] {
    const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = atoms;

    const toValidate: Record<string, PrimitiveAtom<RowInputState>> =
        formIdx === FormIdx.login
            ? { ...p1General, ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon }
            : { ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon };

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
