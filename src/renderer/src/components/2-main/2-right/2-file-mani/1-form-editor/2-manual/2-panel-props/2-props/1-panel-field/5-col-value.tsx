import { use, useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx, type OptionTextValue } from "@/store/manifest";
import { cpassFieldsIdx, loginFieldsIdx, safeManiAtoms, type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputSelectUi } from "../8-props-ui/4-input-select-ui";
import { Column4_Value } from "../../../../1-normal/1-fields";
import { isSpecialCpassFieldAtom } from "./8-forms-fields";

export function Col_ManualFieldValue({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { typeAtom, rfieldAtom, rfieldUuidAtom } = item.rowCtx;

    const rindexUuid = useAtomValue(rfieldUuidAtom);

    const isSpecialCpassField = useSetAtom(isSpecialCpassFieldAtom); //TODO: and not linked; add field for linked value
    const specialCpass = isSpecialCpassField(item.rowCtx, fileUsCtx);

    const maniAtoms = safeManiAtoms(useAtomValue(fileUsCtx.fileUs.maniAtomsAtom));
    const rfield = useAtomValue(rfieldAtom); // in|out

    return (<>
        {specialCpass
            ? <Case_ValueForCpassPsw item={item} />
            : <Case_ValueForLoginAndNotPsw item={item} fileUsCtx={fileUsCtx} />
        }
    </>);
}

function Case_ValueForLoginAndNotPsw({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, valueLifeAtom } = item.rowCtx;
    return (
        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue=""
        />
    );
}

function Case_ValueForCpassPsw({ item }: { item: ManualFieldState.CtxFld; }) {
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
