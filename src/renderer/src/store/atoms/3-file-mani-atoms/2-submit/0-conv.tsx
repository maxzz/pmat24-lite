import { Getter, Setter } from 'jotai';
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { debounce } from '@/utils';
import { CreateAtomsParams } from '../9-types';

type SubmitForAtoms = {
    doSubmit: boolean;
};

export type SubmitAtoms = Prettify<Atomize<SubmitForAtoms>>;

export namespace SubmitState {

    export function createUiAtoms({ fileUs, fileUsAtom, formIdx, changesAtom }: CreateAtomsParams, onChange: OnValueChangeAny): SubmitAtoms {

        // const metaForm = fileUs.meta?.[formIdx];
        // if (!metaForm) {
        //     return [];
        // }

        // const fields = metaForm.fields || [];
        // const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);



        // const metaForm = fileUs.meta?.[formIdx];
        // if (!metaForm) {
        //     return;
        // }
        
        return {
            doSubmitAtom: atomWithCallback(true, onChange),
        };
    }

    function combineResultFromAtoms(atoms: SubmitAtoms, get: Getter, set: Setter) {
        const result = {
            doSubmit: get(atoms.doSubmitAtom),
        };

        console.log('Submit atoms', JSON.stringify(result));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
