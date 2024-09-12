import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { Column3_Label } from "../../../../1-normal/1-fields/3-column-label";
import { Column4_Value } from "../../../../1-normal/1-fields/4-column-value";
import { Column5_Catalog } from "../../../../1-normal/1-fields/5-column-catalog";
import { CatalogItem } from "@/store/manifest";
import { InputLabel } from "../../8-manual-props-ui/1-input-label";
import { ManualFieldType } from "../../8-manual-props-ui/5-input-field-type";
import { ManualFieldPolicy } from "../../8-manual-props-ui/6-input-policy";
// import { SrcriptItemFld } from "@/store";

export function PropsEditorFld({ item }: { item: ManualFieldState.FldForAtoms; }) {

    const { useItAtom, labelAtom, valueLifeAtom, dbnameAtom } = item.rowAtoms;

    /*TODO:*/ function onSelectCatItem(item: CatalogItem | undefined) { }
    /*TODO:*/ const maniIsPassword = false;
    /*TODO:*/ const maniDbName = "123";

    return (<>
        {/* <RowInputWLabel stateAtom={item.} label="Field id" />

            <InputField label="Field label" value={`${snap.id}`} onChange={(e) => item.id = e.target.value} />
            <InputField label="Type" />
            <InputField label="Reference" />
            <InputField label="Value" /> */}

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
            />
        </InputLabel>

        <ManualFieldPolicy item={item} />
    </>);
}
