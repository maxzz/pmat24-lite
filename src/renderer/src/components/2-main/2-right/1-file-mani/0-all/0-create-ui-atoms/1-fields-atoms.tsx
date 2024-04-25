import { Getter, Setter } from 'jotai';
import { Meta, TransformValue, ValueLife } from '@/store/manifest';
import { Atomize, atomWithCallback } from '@/util-hooks';
import { debounce } from '@/utils';

type TableRowForAtoms = {
    useIt: boolean;
    label: string;
    type: string;
    value: string;
    valueAs: string;
    valueLife: ValueLife;
    fieldCat: string;
};

export type TableRowAtoms = Prettify<Atomize<TableRowForAtoms>>;

export function createUiAtoms(field: Meta.Field, onChange: ({ get, set }: { get: Getter; set: Setter; }) => void): TableRowAtoms {
    const { useit, displayname, type: typ, value: val } = field.mani;
    return {
        useItAtom: atomWithCallback(!!useit, onChange),
        labelAtom: atomWithCallback(displayname || '', onChange),
        typeAtom: atomWithCallback('', onChange), //TODO:
        valueAtom: atomWithCallback(val || '', onChange),
        valueAsAtom: atomWithCallback(val || '', onChange),
        valueLifeAtom: atomWithCallback(TransformValue.valueLife4Mani(field.mani), onChange),
        fieldCatAtom: atomWithCallback('', onChange), //TODO:
    };
}

function combineResultFromAtoms(atoms: TableRowAtoms, get: Getter, set: Setter) {
    const result = {
        useIt: get(atoms.useItAtom),
        label: get(atoms.labelAtom),
        type: get(atoms.typeAtom), //TODO:
        value: get(atoms.valueAtom),
        valueAs: get(atoms.valueAsAtom),
        valueLife: get(atoms.valueLifeAtom),
        fieldCat: get(atoms.fieldCatAtom), //TODO: catalog
    };
    
    console.log('TableRow atoms', JSON.stringify(result));
    //TODO: use result
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
