import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx, type ManualFieldState, useIsLinkedToLogin } from "@/store/1-atoms/2-file-mani-atoms";
import { InputSelectUi } from "../8-props-ui/4-input-select-ui";
import { Column4_Value } from "../../../../1-normal/1-fields";

export function Col_ManualFieldValue({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { rowCtx } = item;
    const isLinked = useIsLinkedToLogin(rowCtx, fileUsCtx);
    return (<>
        {isLinked
            ? <Case_ValueForCpassPsw rowCtx={rowCtx} />
            : <Case_ValueForLoginAndNotPsw rowCtx={rowCtx} />
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

// this is a copy of Column4_ValueSelector

function Case_ValueForCpassPsw({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const [rfield, setRfield] = useAtom(rowCtx.rfieldAtom);
    return (
        <InputSelectUi
            triggerClasses={inputAsRefClasses}
            items={inputTypes}
            value={rfield}
            onValueChange={setRfield}
        />
    );
}

const inputTypes: OptionTextValue[] = [
    ["Current password", "in"], // old password
    ["New passowrd", "out"], // new password
    //["Confirm new passowrd", "out"], // new password //TODO: confirm new password, so far two new passwords are the same
];

const inputAsRefClasses = "w-full text-[0.6rem] !text-blue-400 cursor-pointer";

// rfield: string;                 // 'in' | 'out': in(old psw) - from login form field value, out(new psw) - to login form field value
// rfieldIndex: number;            // Index to password field in login from cpass, like '2'
