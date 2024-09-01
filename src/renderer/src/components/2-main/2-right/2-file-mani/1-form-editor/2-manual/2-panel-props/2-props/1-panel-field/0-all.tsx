import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { Column3_Label } from "../../../../1-normal/1-fields/3-column-label";
import { Column4_Value } from "../../../../1-normal/1-fields/4-column-value";
import { Column5_Catalog } from "../../../../1-normal/1-fields/5-column-catalog";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { CatalogItem } from "@/store/manifest";
// import { SrcriptItemFld } from "@/store";

export function PropsEditorFld({ item}: { item: ManualFieldState.FldForAtoms; }) {

    const { useItAtom, labelAtom, valueLifeAtom, dbnameAtom, policiesAtom, metaField } = item.field;

    /*TODO:*/ function enableRow() { }
    /*TODO:*/ function onSelectCatItem(item: CatalogItem | undefined) { }
    /*TODO:*/ const maniIsPassword = false;
    /*TODO:*/ const maniDbName = "123";

    return (<>
        {/* <RowInputWLabel stateAtom={item.} label="Field id" />

            <InputField label="Field label" value={`${snap.id}`} onChange={(e) => item.id = e.target.value} />
            <InputField label="Type" />
            <InputField label="Reference" />
            <InputField label="Value" /> */}

        <Column3_Label
            useItAtom={useItAtom}
            valueAtom={labelAtom}
            onClick={enableRow}
        />

        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue={""}
            onClick={enableRow}
        />

        <Column5_Catalog
            useItAtom={useItAtom}
            fieldCatAtom={dbnameAtom}
            onSelectCatItem={onSelectCatItem}
            maniIsPassword={maniIsPassword}
            maniDbName={maniDbName}
            onClick={enableRow}
        />

        <Column6_Policy
            useItAtom={useItAtom}
            policiesAtom={policiesAtom}
            metaField={metaField}
            onClick={enableRow}
        />

    </>);
}
