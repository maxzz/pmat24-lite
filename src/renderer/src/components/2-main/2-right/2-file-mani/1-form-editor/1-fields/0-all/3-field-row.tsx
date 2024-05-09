import { useSetAtom } from "jotai";
import { FieldsState } from "@/store/atoms/3-file-mani-atoms";
import { CatalogItem } from "@/store/manifest";
import { Column1_UseIt } from "../1-column-useIt";
import { Column2_Label } from "../2-column-label";
import { Column3_Value } from "../3-column-value";
import { Column4_Catalog } from "../4-column-catalog";
import { Column5_Type } from "../5-column-type";

export function FieldRow({ fieldRowAtoms }: { fieldRowAtoms: FieldsState.Atoms; }) {
    const { useItAtom, labelAtom, valueLifeAtom, dbnameAtom, maniField } = fieldRowAtoms;

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    function onSelectCatItem(item: CatalogItem | undefined) {
    }

    return (<>
        <Column5_Type
            useItAtom={useItAtom}
            maniField={maniField}
            onClick={enableRow}
        />

        <Column1_UseIt
            useItAtom={useItAtom}
        />

        <Column2_Label
            useItAtom={useItAtom}
            valueAtom={labelAtom}
            onClick={enableRow}
        />

        <Column3_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue={maniField.choosevalue}
            onClick={enableRow}
        />

        <Column4_Catalog
            useItAtom={useItAtom}
            fieldCatAtom={dbnameAtom}
            onSelectCatItem={onSelectCatItem}
            maniField={maniField}
            onClick={enableRow}
        />
    </>);
}
