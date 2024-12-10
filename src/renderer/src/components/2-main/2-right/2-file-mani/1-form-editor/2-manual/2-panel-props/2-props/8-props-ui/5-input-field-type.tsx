import { useAtom } from "jotai";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { InputSelectUi, OptionTextValue2 } from "./4-input-select-ui";
// import { FieldTyp, type OptionTextValue } from "@/store/manifest";
import { FieldTyp } from "@/store/manifest";


const inputTypes: OptionTextValue2[] = [
    ["Text", `${FieldTyp.edit}`], 
    ["Passowrd", `${FieldTyp.psw}`],
];

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
