import { useAtom } from "jotai";
import { type FileUsCtx, type ManualFieldState } from "@/store/2-file-mani-atoms";
import { FieldTyp, type OptionTextValue } from "@/store/manifest";
import { InputSelectUi } from "@/ui";
import { InputLabel } from "../8-props-ui";
import { Column3_Label } from "../../../../1-normal/1-fields";

export function FirstRow({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, labelAtom } = item.rowCtx;
    return (
        <div className="grid grid-cols-[auto,1fr] gap-2">
            <InputLabel label="Type">
                <Col_ManualFieldType item={item} />
            </InputLabel>

            <InputLabel label="Label">
                <Column3_Label
                    useItAtom={useItAtom}
                    valueAtom={labelAtom}
                    highlightCtx={{ mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx }}
                />
            </InputLabel>
        </div>
    );
}

function Col_ManualFieldType({ item }: { item: ManualFieldState.CtxFld; }) {
    const [type, setType] = useAtom(item.rowCtx.typeAtom);
    return (
        <InputSelectUi
            items={inputTypeNames}
            value={`${type}`}
            onValueChange={(value) => setType(+value as FieldTyp)}
        />
    );
}

const inputTypeNames: OptionTextValue[] = [
    ["Text", `${FieldTyp.edit}`], 
    ["Passowrd", `${FieldTyp.psw}`],
];
