import { type FileUsCtx, type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { type FceItem } from "@/store";
import { Column3_Label } from "../../../../1-normal/1-fields/3-column-label";
import { Column4_Value } from "../../../../1-normal/1-fields/4-column-value";
import { Column5_Catalog } from "../../../../1-normal/1-fields/5-column-catalog";
import { InputLabel, ManualFieldPolicy, ManualFieldType } from "../8-props-ui";
// import { SrcriptItemFld } from "@/store";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {

    const { useItAtom, labelAtom, valueLifeAtom, dbnameAtom } = item.rowCtx;

    /*TODO:*/ function onSelectCatItem(item: FceItem | undefined) { }
    /*TODO:*/ const maniIsPassword = false;
    /*TODO:*/ const maniDbName = "123";

    return (<>
        {/* 
            <RowInputWLabel stateAtom={item.} label="Field id" />

            <InputField label="Field label" value={`${snap.id}`} onChange={(e) => item.id = e.target.value} />
            <InputField label="Type" />
            <InputField label="Reference" />
            <InputField label="Value" /> 
        */}

        <InputLabel label="Type">
            <ManualFieldType item={item} />
        </InputLabel>

        <InputLabel label="Label">
            <Column3_Label
                useItAtom={useItAtom}
                valueAtom={labelAtom}
            />
        </InputLabel>

        <InputLabel label="Value">
            <Column4_Value
                useItAtom={useItAtom}
                valueLifeAtom={valueLifeAtom}
                choosevalue={""}
            />
        </InputLabel>

        <InputLabel label="Catalog">
            <Column5_Catalog
                useItAtom={useItAtom}
                fieldCatAtom={dbnameAtom}
                onSelectCatItem={onSelectCatItem}
                maniIsPassword={maniIsPassword}
                maniDbName={maniDbName}
                fileUsCtx={fileUsCtx}
            />
        </InputLabel>

        <ManualFieldPolicy item={item} />
    </>);
}
