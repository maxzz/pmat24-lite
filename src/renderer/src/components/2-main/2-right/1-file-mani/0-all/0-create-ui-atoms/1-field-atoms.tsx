import { Getter, Setter } from 'jotai';
import { FieldTyp, Mani, Meta, TransformValue, ValueLife, fieldTyp4Str } from '@/store/manifest';
import { Atomize, atomWithCallback } from '@/util-hooks';
import { debounce } from '@/utils';

type FieldRowForAtoms = {
    useIt: boolean;
    label: string;
    type: FieldTyp;
    //value: string;
    //valueAs: string;
    valueLife: ValueLife;
    fieldCat: string;
};

export type FieldRowAtoms = Prettify<Atomize<FieldRowForAtoms>>;

export namespace FieldRowState {

    export function createUiAtoms(field: Meta.Field, onChange: ({ get, set }: { get: Getter; set: Setter; }) => void): FieldRowAtoms {
        const { useit, displayname, type: typ, value: val } = field.mani;
        return {
            useItAtom: atomWithCallback(!!useit, onChange),
            labelAtom: atomWithCallback(displayname || '', onChange),
            typeAtom: atomWithCallback(fieldTyp4Str(field.mani), onChange),
            //valueAtom: atomWithCallback(val || '', onChange),
            //valueAsAtom: atomWithCallback(val || '', onChange),
            valueLifeAtom: atomWithCallback(TransformValue.valueLife4Mani(field.mani), onChange),
            fieldCatAtom: atomWithCallback('', onChange), //TODO:
        };
    }

    function combineResultFromAtoms(atoms: FieldRowAtoms, get: Getter, set: Setter) {
        const result = {
            useIt: get(atoms.useItAtom),
            label: get(atoms.labelAtom),
            type: fieldTyp2Obj(get(atoms.typeAtom)),
            //value: get(atoms.valueAtom),
            //valueAs: get(atoms.valueAsAtom),
            valueLife: get(atoms.valueLifeAtom),
            fieldCat: get(atoms.fieldCatAtom), //TODO: catalog
        };

        const maniField: Pick<Mani.Field, 'useit' | 'displayname' | 'type' | 'password' | 'value' | 'askalways' | 'onetvalue'> = {
            useit: result.useIt,
            displayname: result.label,
            ...result.type,
        };

        // TransformValue.valueLife2Mani(result.valueLife, maniField);

        console.log('TableRow atoms', JSON.stringify(result));
        //TODO: use result

        //TODO: cannot return anything
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}

//TODO: move to package
export function fieldTyp2Obj(typ: FieldTyp): { password?: boolean | undefined; type: Mani.FieldTypeStr; } {
    const type = FieldTyp[typ] as Mani.FieldTypeStr;
    return {
        type,
        ...(typ === FieldTyp.psw && { 'password': true }),
    };
}
