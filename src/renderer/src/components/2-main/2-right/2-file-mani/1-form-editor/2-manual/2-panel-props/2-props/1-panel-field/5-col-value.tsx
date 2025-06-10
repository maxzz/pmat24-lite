import { useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx, type OptionTextValue } from "@/store/manifest";
import { cpassFieldsIdx, loginFieldsIdx, type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputSelectUi } from "../8-props-ui/4-input-select-ui";
import { Column4_Value } from "../../../../1-normal/1-fields";

export function Col_ManualFieldValue({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { typeAtom, rfieldAtom, rfieldIndexAtom } = item.rowCtx;

    const isFieldPsw = useAtomValue(typeAtom) === FieldTyp.psw;
    const isFormLogin = fileUsCtx.formIdx === FormIdx.login;
    const specialCpass = !isFormLogin && isFieldPsw; //TODO: and not linked; add field for linked value

    const maniAtoms = useAtomValue(fileUsCtx.fileUs.maniAtomsAtom);
    const rfield = useAtomValue(rfieldAtom); // in|out
    const rindexfield = useAtomValue(rfieldIndexAtom);

    const currentForm = maniAtoms?.[fileUsCtx.formIdx];
    const loginFormFields = maniAtoms?.[loginFieldsIdx];
    const cpassFormFields = maniAtoms?.[cpassFieldsIdx];

    const links = useSetAtom(getLinksAtom);
    console.log('links', links(fileUsCtx));

    return (<>
        {specialCpass
            ? <ValueForCpassPsw item={item} />
            : <ValueForLoginAndNotPsw item={item} fileUsCtx={fileUsCtx} />
        }
    </>);
}

const getLinksAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx) => {
        const maniAtoms = get(fileUsCtx.fileUs.maniAtomsAtom);
        const formIdx = fileUsCtx.formIdx;
        const currentForm = maniAtoms?.[formIdx];
        if (!currentForm) {
            return;
        }

        const loginFormFieldsAtom = maniAtoms?.[loginFieldsIdx];
        const cpassFormFieldsAtom = maniAtoms?.[cpassFieldsIdx];

        return [
            loginFormFieldsAtom && get(loginFormFieldsAtom),
            cpassFormFieldsAtom && get(cpassFormFieldsAtom)
        ];
    }
);

function ValueForLoginAndNotPsw({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, valueLifeAtom } = item.rowCtx;
    return (
        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue=""
        />
    );
}

function ValueForCpassPsw({ item }: { item: ManualFieldState.CtxFld; }) {
    const [type, setType] = useState('1');
    return (
        <InputSelectUi
            items={inputTypes}
            value={`${type}`}
            onValueChange={(value) => setType(value)}
        />
    );
}

const inputTypes: OptionTextValue[] = [
    // ["no link", "0"],
    ["Current password", "1"], // 'in'
    ["New passowrd", "2"], // 'out'
];

// rfield: string;                 // 'in' | 'out': in(old psw) - from login form field value, out(new psw) - to login form field value
// rfieldIndex: number;            // Index to password field in login from cpass, like '2'
