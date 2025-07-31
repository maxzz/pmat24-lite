import { type RowInputStateAtoms, validateRowInputStateAtoms } from "@/ui";
import { FormIdx } from "@/store/manifest";
import { type VerifyError } from "../../9-types";
import { type FormOptionsState } from "./9-types";

export function getMainOptionsVerifyErrors(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] {
    const { p1General, p3Auth, p4QL } = atoms;

    const toValidate: RowInputStateAtoms =
        formIdx === FormIdx.login
            ? { ...p3Auth, ...p4QL, ...p1General, }
            : { ...p3Auth, ...p4QL, };

    const rv: VerifyError[] = validateRowInputStateAtoms(toValidate, 'options', getset);
    return rv;
}

export function getOptionsInFormVerifyErrors(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] {
    const { p2Detect, p5Icon } = atoms;

    const toValidate: RowInputStateAtoms =
        formIdx === FormIdx.login
            ? { ...p2Detect, ...p5Icon, }
            : { ...p2Detect, ...p5Icon, };

    const rv: VerifyError[] = validateRowInputStateAtoms(toValidate, formIdx === FormIdx.login ? 'login' : 'cpass', getset);
    return rv;
}
