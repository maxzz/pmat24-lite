import { useAtom } from "jotai";
import { type ManualFieldState } from "@/store/1-atoms/3-file-mani-atoms";
import { InputSelectUi } from "./4-input-select-ui";
import { FieldTyp, type OptionTextValue } from "@/store/manifest";

export function ManualFieldType({ item }: { item: ManualFieldState.CtxFld; }) {

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
