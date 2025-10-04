import { FormIdx, Matching } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { type RowInputStateAtoms, validateRowInputStateAtoms } from "@/ui";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options/2-conv-options/9-types";

export function getVerifyErrors_MainOptionsTab(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (formCtx) {
        const toValidate = getToVerify(formCtx.options, formIdx, getset);
        
        const rv: VerifyError[] = validateRowInputStateAtoms(toValidate, 'options', getset);
        return rv.length ? rv : undefined;
    }

    function getToVerify(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, getset: GetSet): RowInputStateAtoms {
        const { p1General, p3Auth, p4QL } = atoms;

        const toValidate: RowInputStateAtoms =
            formIdx === FormIdx.login
                ? { ...p3Auth, ...p4QL, ...p1General, }
                : { ...p3Auth, ...p4QL, };
        
        return toValidate;
    }
}

export function getVerifyErrors_FormOptionsTab(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] {
    const toValidate: RowInputStateAtoms = getToVerify(atoms, formIdx, getset);

    const rv: VerifyError[] = validateRowInputStateAtoms(toValidate, formIdx === FormIdx.login ? 'login' : 'cpass', getset);
    return rv;

    function getToVerify(atoms: FormOptionsState.AllAtoms, formIdx: FormIdx, { get }: GetOnly): RowInputStateAtoms {
        const { p2Detect, p5Icon, isWebAtom, murl_howAtom, murl_regexAtom } = atoms;

        const isWeb = get(isWebAtom); // Exclude atom with validation that are not appropriate depending on the form
        const murl = isWeb && get(murl_howAtom) === Matching.How.regex ? { murl_regexAtom } : undefined;

        const toValidate: RowInputStateAtoms =
            formIdx === FormIdx.login
                ? { ...p2Detect, ...murl, ...p5Icon, }
                : { ...p2Detect, ...murl, ...p5Icon, };

        if (isWeb) {
            delete toValidate.captionAtom;
        }

        return toValidate;
    }
}
