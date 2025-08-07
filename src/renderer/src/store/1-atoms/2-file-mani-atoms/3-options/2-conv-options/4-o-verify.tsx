import { type RowInputStateAtoms, validateRowInputStateAtoms } from "@/ui";
import { FormIdx } from "@/store/manifest";
import { type VerifyError } from "../../9-types";
import { type FormOptionsState } from "./9-types";

export function getOptionsVerifyErrors_OfMain(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] {
    const { p1General, p3Auth, p4QL } = atoms;

    const toValidate: RowInputStateAtoms =
        formIdx === FormIdx.login
            ? { ...p3Auth, ...p4QL, ...p1General, }
            : { ...p3Auth, ...p4QL, };

    const rv: VerifyError[] = validateRowInputStateAtoms(toValidate, 'options', getset);
    return rv;
}

export function getOptionsVerifyErrors_OfForm(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] {
    const toValidate: RowInputStateAtoms = getFormAtomsToValidate(atoms, formIdx, getset);
    const rv: VerifyError[] = validateRowInputStateAtoms(toValidate, formIdx === FormIdx.login ? 'login' : 'cpass', getset);
    return rv;
}

function getFormAtomsToValidate(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, { get }: GetOnly): RowInputStateAtoms {
    const { p2Detect, p5Icon, isWebAtom } = atoms;

    const toValidate: RowInputStateAtoms =
        formIdx === FormIdx.login
            ? { ...p2Detect, ...p5Icon, }
            : { ...p2Detect, ...p5Icon, };

    const isWeb = get(isWebAtom); // Exclude atom with validation that are not appropriate depending on the form
    if (isWeb) {
        delete toValidate.captionAtom;
    } else {
        delete toValidate.rurlAtom;
    }

    return toValidate;
}
