import { type RowInputStateAtoms, validateRowInputStateAtoms } from "@/ui";
import { FormIdx } from "@/store/manifest";
import { type VerifyError } from "../../9-types";
import { type FormOptionsState } from "./9-types";

export function getVerifyErrors(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, { get }: GetOnly): VerifyError[] {
    const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = atoms;

    const toValidate: RowInputStateAtoms =
        formIdx === FormIdx.login
            ? { ...p1General, ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon }
            : { ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon };

    const rv: VerifyError[] = validateRowInputStateAtoms(toValidate, 'options', { get });
    return rv;
}
