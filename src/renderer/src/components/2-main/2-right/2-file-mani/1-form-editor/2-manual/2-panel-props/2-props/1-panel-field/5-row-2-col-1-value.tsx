import { useState } from "react";
import { useAtomValue } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx, type ManualFieldState, useIsLinkedToLogin } from "@/store/1-atoms/2-file-mani-atoms";
import { InputSelectUi } from "../8-props-ui/4-input-select-ui";
import { Column4_Value } from "../../../../1-normal/1-fields";

export function Col_ManualFieldValue({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const isLinked = useIsLinkedToLogin(item.rowCtx, fileUsCtx);
    return (<>
        {isLinked
            ? <Case_ValueForCpassPsw rowCtx={item.rowCtx} />
            : <Case_ValueForLoginAndNotPsw rowCtx={item.rowCtx} />
        }
    </>);
}

function Case_ValueForLoginAndNotPsw({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, valueLifeAtom } = rowCtx;
    return (
        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue=""
        />
    );
}

function Case_ValueForCpassPsw({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const [type, setType] = useState('in'); //TODO: count index of passwords in cpass form and if more then one, then use 'out'

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
    ["Current password", "in"], // old password
    ["New passowrd", "out"], // new password
    //["Confirm new passowrd", "out"], // new password //TODO: confirm new password, so far two new passwords are the same
];

// rfield: string;                 // 'in' | 'out': in(old psw) - from login form field value, out(new psw) - to login form field value
// rfieldIndex: number;            // Index to password field in login from cpass, like '2'
