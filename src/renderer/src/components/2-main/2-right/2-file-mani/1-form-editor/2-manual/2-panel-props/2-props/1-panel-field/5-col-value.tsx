import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { FieldTyp, FormIdx, type OptionTextValue } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputSelectUi } from "../8-props-ui/4-input-select-ui";
import { Column4_Value } from "../../../../1-normal/1-fields";

export function Col_ManualFieldValue({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { typeAtom } = item.rowCtx;

    const isFieldPsw = useAtomValue(typeAtom) === FieldTyp.psw;
    const isFormLogin = fileUsCtx.formIdx === FormIdx.login;
    const specialCpass = !isFormLogin && isFieldPsw; //TODO: and not linked; add field for linked value

    return (<>
        {specialCpass
            ? <ValueForCpassPsw item={item} />
            : <ValueForLoginAndNotPsw item={item} fileUsCtx={fileUsCtx} />
        }
    </>);
}

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
    ["Current password", "1"],
    ["New passowrd", "2"],
];
