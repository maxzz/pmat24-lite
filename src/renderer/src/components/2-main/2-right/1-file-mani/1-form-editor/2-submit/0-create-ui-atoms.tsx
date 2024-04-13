import { Getter, Setter } from 'jotai';
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Meta } from '@/store/manifest';
import { debounce } from '@/utils';

type SubitForAtoms = {
    doSubmit: boolean;
};

type SubitAtoms = Prettify<Atomize<SubitForAtoms>>;

export function createUiAtoms(form: Meta.Form, onChange: OnValueChangeAny): SubitAtoms {
    return {
        doSubmitAtom: atomWithCallback(true, onChange),
    };
}

function combineResultFromAtoms(atoms: SubitAtoms, get: Getter, set: Setter) {
    const result = {
        doSubmit: get(atoms.doSubmitAtom),
    };
    
    console.log('Submit atoms', JSON.stringify(result));
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
