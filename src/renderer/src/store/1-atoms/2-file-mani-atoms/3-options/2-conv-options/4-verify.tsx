import { type FormOptionsState } from "./9-types";
import { type RowInputStateAtoms, type RowInputState } from "@/ui";
import { FormIdx } from "@/store/manifest";
import { VerifyError } from "../../9-types";

export function getVerifyErrors(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, { get }: GetOnly): VerifyError[] {
    const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = atoms;

    const toValidate: RowInputStateAtoms =
        formIdx === FormIdx.login
            ? { ...p1General, ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon }
            : { ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon };

    const rv: VerifyError[] = validateRowInputStateAtoms(toValidate, { get });
    return rv;
}

export function validateRowInputStateAtoms(toValidate: RowInputStateAtoms, { get }: GetOnly): VerifyError[] {
    const rv: VerifyError[] = Object.entries(toValidate)
        .map(
            ([key, atom]) => {
                const atomValue: RowInputState = get(atom);
                const error = atomValue.validate?.(atomValue.data);
                const rv: VerifyError | undefined =
                    error
                        ? {
                            error: error,
                            tab: 'options',
                        }
                        : undefined;
                return rv;
            }
        ).filter(Boolean);

    return rv;
}
