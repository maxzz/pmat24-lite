import { Getter, Setter } from 'jotai';
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { debounce } from '@/utils';
import { CreateAtomsParams, ManiChangesAtom } from '../9-types';

type PolicyForAtoms = {
    policy: string;
    policy2: string;
};

export type PolicyAtoms = Prettify<Atomize<PolicyForAtoms>>;

export namespace PolicyState {

    export function createUiAtoms({ fileUs, fileUsAtom, formIdx, changesAtom }: CreateAtomsParams, onChange: OnValueChangeAny): PolicyAtoms {
        return {
            policyAtom: atomWithCallback('', onChange),
            policy2Atom: atomWithCallback('', onChange),
        };
    }

    function combineResultFromAtoms(atoms: PolicyAtoms, changesAtom: ManiChangesAtom, get: Getter, set: Setter) {
        const result = {
            policy: get(atoms.policyAtom),
            policy2: get(atoms.policy2Atom),
        };

        console.log('Policy atoms', JSON.stringify(result));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
