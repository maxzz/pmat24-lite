import { useSetAtom } from "jotai";
import { type NormalFieldsState } from "@/store/atoms/3-file-mani-atoms/1-normal-fields/0-all-normal-ctx/1-create-fields-context";
import { type CatalogItem } from "@/store/manifest";
import { Column1_UseIt } from "../1-column-useIt";
import { Column2_Type } from "../2-column-type";
import { Column3_Label } from "../3-column-label";
import { Column4_Value } from "../4-column-value";
import { Column5_Catalog } from "../5-column-catalog";
import { Column6_Policy } from "../6-column-policy";

export function FieldRow({ fieldRowAtoms }: { fieldRowAtoms: NormalFieldsState.Atoms; }) {
    const { useItAtom, typeAtom, labelAtom, valueLifeAtom, dbnameAtom, policiesAtom, metaField } = fieldRowAtoms;
    const maniField = metaField.mani;

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
            maniIsPassword={maniField.password}
            maniDbName={maniField.dbname}
            onClick={enableRow}
        />

        <Column6_Policy
            useItAtom={useItAtom}
            typeAtom={typeAtom}
            policiesAtom={policiesAtom}
            onClick={enableRow}
        />
    </>);
}
