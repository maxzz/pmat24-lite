import { type FileUsCtx, type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { type FceItem } from "@/store";
import { Column3_Label, Column4_Value, Column5_Catalog } from "../../../../1-normal/1-fields";
import { InputLabel, ManualFieldPolicy, ManualFieldType } from "../8-props-ui";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, labelAtom, valueLifeAtom } = item.rowCtx;

    function onSelectCatItem(item: FceItem | undefined) {
        /*TODO:*/
    }

    return (<>
        <div className="grid grid-cols-[auto,1fr] gap-2">
            <InputLabel label="Type">
                <ManualFieldType item={item} />
            </InputLabel>

            <InputLabel label="Label">
                <Column3_Label
                    useItAtom={useItAtom}
                    valueAtom={labelAtom}
                />
            </InputLabel>
        </div>

        <div className="grid grid-cols-[1fr,1fr,auto]">
            <InputLabel label="Value">
                <Column4_Value
                    useItAtom={useItAtom}
                    valueLifeAtom={valueLifeAtom}
                    choosevalue={""}
                />
            </InputLabel>

            <InputLabel label="Catalog" className="ml-2">
                <Column5_Catalog
                    rowCtx={item.rowCtx}
                    fileUsCtx={fileUsCtx}
                    onSelectCatItem={onSelectCatItem}
                />
            </InputLabel>

            <ManualFieldPolicy item={item} />
        </div>
    </>);
}
