import { Getter, Setter } from 'jotai';
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { debounce } from '@/utils';
import { CreateAtomsParams, ManiAtoms } from '../9-types';

type PolicyForAtoms = {
    policy: string;
    policy2: string;
};

export type PolicyAtoms = Prettify<Atomize<PolicyForAtoms>>;

export namespace PolicyState {

    export function createUiAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, onChange: OnValueChangeAny): PolicyAtoms {

        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        return {
            policyAtom: atomWithCallback('', onChange),
            policy2Atom: atomWithCallback('', onChange),
        };
    }

    function combineResultFromAtoms(atoms: PolicyAtoms, get: Getter, set: Setter) {
        const result = {
            policy: get(atoms.policyAtom),
            policy2: get(atoms.policy2Atom),
        };

        console.log('Policy atoms', JSON.stringify(result));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
