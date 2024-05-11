import { useSetAtom } from "jotai";
import { FieldsState } from "@/store/atoms/3-file-mani-atoms";
import { CatalogItem } from "@/store/manifest";
import { Column1_UseIt } from "../1-column-useIt";
import { Column2_Type } from "../2-column-type";
import { Column3_Label } from "../3-column-label";
import { Column4_Value } from "../4-column-value";
import { Column5_Catalog } from "../5-column-catalog";
import { Column6_Policy } from "../6-column-policy";

export function FieldRow({ fieldRowAtoms }: { fieldRowAtoms: FieldsState.Atoms; }) {
    const { useItAtom, labelAtom, valueLifeAtom, dbnameAtom, maniField } = fieldRowAtoms;

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    function onSelectCatItem(item: CatalogItem | undefined) {
    }

    return (<>
        <Column2_Type
            useItAtom={useItAtom}
            maniField={maniField}
            onClick={enableRow}
        />

        <Column1_UseIt
            useItAtom={useItAtom}
        />

        <Column3_Label
            useItAtom={useItAtom}
            valueAtom={labelAtom}
            onClick={enableRow}
        />

        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue={maniField.choosevalue}
            onClick={enableRow}
        />

        <Column5_Catalog
            useItAtom={useItAtom}
            fieldCatAtom={dbnameAtom}
            onSelectCatItem={onSelectCatItem}
            maniField={maniField}
            onClick={enableRow}
        />

        <Column6_Policy
            useItAtom={useItAtom}
            valueAtom={labelAtom}
            onClick={enableRow}
        />

    </>);
}
