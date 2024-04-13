import { Getter, Setter } from 'jotai';
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Meta } from '@/store/manifest';
import { debounce } from '@/utils';

type PolicyForAtoms = {
    policy: string;
    policy2: string;
};

type PolicyAtoms = Prettify<Atomize<PolicyForAtoms>>;

export function createUiAtoms(form: Meta.Form | undefined, onChange: OnValueChangeAny): PolicyAtoms {
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
