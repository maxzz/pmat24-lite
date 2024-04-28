import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { CatalogItem, Meta, TransformValue, fieldTyp4Str } from "@/store/manifest";
import { FieldRowState } from "../../../0-all/0-create-ui-atoms/1-fields/2-field-atoms";
import { FieldsState, ManiAtoms } from "../../../0-all/0-create-ui-atoms";
import { Column1_UseIt } from "../1-column-useIt";
import { Column2_Label } from "../2-column-label";
import { Column3_Value } from "../3-column-value";
import { Column4_Catalog } from "../4-column-catalog";
import { Column5_Type } from "../5-column-type";

export function FieldRow({ maniAtoms, field }: { maniAtoms: ManiAtoms; field: Meta.Field; }) {
    const rowAtoms = useState(
        (): FieldsState.Atoms => FieldRowState.createUiAtoms(field, ({ get, set }) => FieldRowState.debouncedCombinedResultFromAtoms(rowAtoms, get, set))
    )[0];

    const [useIt, setUseIt] = useAtom(rowAtoms.useItAtom);
    const setLabel = useSetAtom(rowAtoms.labelAtom);
    const setType = useSetAtom(rowAtoms.typeAtom);
    const setValueLife = useSetAtom(rowAtoms.valueLifeAtom);
    const setFieldCat = useSetAtom(rowAtoms.fieldCatAtom);

    const enableRow = () => !useIt && setUseIt(true);

    useEffect(() => {
        const { useit, displayname } = field.mani;

        setUseIt(!!useit);
        setLabel(displayname || '');
        setType(fieldTyp4Str(field.mani)); //TODO:
        setValueLife(TransformValue.valueLife4Mani(field.mani));
        setFieldCat(''); //TODO:
    }, [field]);

    function onSelectCatItem(item: CatalogItem | undefined) {
    }

    return (<>
        <Column1_UseIt
            useItAtom={rowAtoms.useItAtom}
        />

        <Column2_Label
            useItAtom={rowAtoms.useItAtom}
            valueAtom={rowAtoms.labelAtom}
            onClick={enableRow}
        />

        <Column3_Value
            useItAtom={rowAtoms.useItAtom}
            valueLifeAtom={rowAtoms.valueLifeAtom}
            choosevalue={field.mani.choosevalue}
            onClick={enableRow}
        />

        <Column4_Catalog
            useItAtom={rowAtoms.useItAtom}
            fieldCatAtom={rowAtoms.fieldCatAtom}
            onSelectCatItem={onSelectCatItem}
            field={field}
            onClick={enableRow}
        />

        <Column5_Type
            useItAtom={rowAtoms.useItAtom}
            field={field}
            onClick={enableRow}
        />
    </>);
}
