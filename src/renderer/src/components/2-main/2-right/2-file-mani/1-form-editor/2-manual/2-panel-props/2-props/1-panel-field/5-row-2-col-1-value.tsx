import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
import { type NormalField, type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputSelectUi } from "../8-props-ui/4-input-select-ui";
import { Column4_Value } from "../../../../1-normal/1-fields";
import { isSpecialCpassFieldAtom } from "./8-form-field-atoms";

export function Col_ManualFieldValue({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const isSpecialCpassField = useSetAtom(isSpecialCpassFieldAtom); //TODO: and not linked; add field for linked value
    const specialCpass = isSpecialCpassField(item.rowCtx, fileUsCtx);
    return (<>
        {specialCpass
            ? <Case_ValueForCpassPsw rowCtx={item.rowCtx} />
            : <Case_ValueForLoginAndNotPsw rowCtx={item.rowCtx} />
        }
    </>);
}

function Case_ValueForLoginAndNotPsw({ rowCtx }: { rowCtx: NormalField.RowCtx; }) {
    const { useItAtom, valueLifeAtom } = rowCtx;
    return (
        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue=""
        />
    );
}

function Case_ValueForCpassPsw({ rowCtx }: { rowCtx: NormalField.RowCtx; }) {
    const [type, setType] = useState('1');

    const rfield = useAtomValue(rowCtx.rfieldAtom); // in|out
    
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
