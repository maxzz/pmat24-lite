import { useAtom } from "jotai";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { InputSelectUi } from "./4-input-select-ui";
import { FieldTyp, ModifierDisplayText } from "@/store/manifest";

const inputTypes: ModifierDisplayText[] = [
    ["Text", `${FieldTyp.edit}`], 
    ["Passowrd", `${FieldTyp.psw}`],
];

export function ManualFieldType({ item }: { item: ManualFieldState.FldForAtoms; }) {

    const [type, setType] = useAtom(item.rowCtx.typeAtom);

    return (
        <InputSelectUi
            items={inputTypes}
            value={`${type}`}
            onValueChange={(value) => setType(+value as FieldTyp)}
        />
    );
}
