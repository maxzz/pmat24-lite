import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { CatalogItem, Meta, TransformValue } from '@/store/manifest';
import { createUiAtoms, debouncedCombinedResultFromAtoms } from './0-create-ui-atoms';
import { Column1_UseIt } from '../1-column-useIt';
import { Column2_Label } from '../2-column-label';
import { Column3_Value } from '../3-column-value';
import { Column4_Catalog } from '../4-column-catalog';
import { Column5_Type } from '../5-column-type';

export function TableRow({ field }: { field: Meta.Field; }) {
    const rowAtoms = useState(() => createUiAtoms(field,
        ({ get, set }) => {
            //console.log('changed', field, field.mani.displayname);
            debouncedCombinedResultFromAtoms(rowAtoms, get, set);
        })
    )[0];

    const [useIt, setUseIt] = useAtom(rowAtoms.useItAtom);
    const setLabel = useSetAtom(rowAtoms.labelAtom);
    const setType = useSetAtom(rowAtoms.typeAtom);
    const setValue = useSetAtom(rowAtoms.valueAtom);
    const setValueAs = useSetAtom(rowAtoms.valueAsAtom);
    const setValueLife = useSetAtom(rowAtoms.valueLifeAtom);
    const setFieldCat = useSetAtom(rowAtoms.fieldCatAtom);

    //const rowClassName = useIt ? "" : "opacity-30 pointer-events-none";
    const enableRow = () => !useIt && setUseIt(true);

    //console.log('============================================================');
    useEffect(() => {
        //console.log('-----------------------------------');
        const { useit, displayname, type: typ, value: val } = field.mani;

        setUseIt(!!useit);
        setLabel(displayname || '');
        setType(''); //TODO:
        setValue(val || '');
        setValueAs(val || '');
        setValueLife(TransformValue.valueLife4Mani(field.mani));
        setFieldCat(''); //TODO:
    }, [field]);

    function onSelectCatItem(item: CatalogItem | undefined) {
    }

    return (<>
        <Column1_UseIt useItAtom={rowAtoms.useItAtom} />
        <Column2_Label useItAtom={rowAtoms.useItAtom} valueAtom={rowAtoms.labelAtom} onClick={enableRow} />
        <Column3_Value useItAtom={rowAtoms.useItAtom} valueLifeAtom={rowAtoms.valueLifeAtom} choosevalue={field.mani.choosevalue} onClick={enableRow} />
        <Column4_Catalog useItAtom={rowAtoms.useItAtom} fieldCatAtom={rowAtoms.fieldCatAtom} onSelectCatItem={onSelectCatItem} field={field} onClick={enableRow} />
        <Column5_Type useItAtom={rowAtoms.useItAtom} field={field} onClick={enableRow} />
    </>);
}
