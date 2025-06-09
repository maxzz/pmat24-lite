import { useAtom, useAtomValue } from "jotai";
import { FieldTyp, FormIdx, type OptionTextValue } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputSelectUi } from "../8-props-ui/4-input-select-ui";
import { Column4_Value } from "../../../../1-normal/1-fields";

export function ManualFieldValue({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, valueLifeAtom, typeAtom } = item.rowCtx;

    const isFieldPsw = useAtomValue(typeAtom) === FieldTyp.psw;
    const isFormLogin = fileUsCtx.formIdx === FormIdx.login;
    const specialCpass = !isFormLogin && isFieldPsw;

    return (<>
        {specialCpass
            ? <ManualFieldValueCpass item={item} />
            : <ManualFieldValueLogin item={item} fileUsCtx={fileUsCtx} />
        }
    </>);
}

function ManualFieldValueLogin({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, valueLifeAtom, typeAtom } = item.rowCtx;

    const isFieldPsw = useAtomValue(typeAtom) === FieldTyp.psw;
    const isFormLogin = fileUsCtx.formIdx === FormIdx.login;

    return (
        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue=""
        />
    );
}

function ManualFieldValueCpass({ item }: { item: ManualFieldState.CtxFld; }) {

    const [type, setType] = useAtom(item.rowCtx.typeAtom);

    return (
        <InputSelectUi
            items={inputTypes}
            value={`${type}`}
            onValueChange={(value) => setType(+value as FieldTyp)}
        />
    );
}

const inputTypes: OptionTextValue[] = [
    ["Text", `${FieldTyp.edit}`],
    ["Passowrd", `${FieldTyp.psw}`],
];
