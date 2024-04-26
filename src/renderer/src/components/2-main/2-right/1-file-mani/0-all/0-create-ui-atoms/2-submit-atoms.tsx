import { Getter, Setter } from 'jotai';
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Meta } from '@/store/manifest';
import { debounce } from '@/utils';

type SubmitForAtoms = {
    doSubmit: boolean;
};

export type SubmitAtoms = Prettify<Atomize<SubmitForAtoms>>;

export namespace SubmitState {

    export function createUiAtoms(form: Meta.Form | undefined, onChange: OnValueChangeAny): SubmitAtoms {
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
