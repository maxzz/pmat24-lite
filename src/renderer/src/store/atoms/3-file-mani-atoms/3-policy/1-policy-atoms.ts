import { Getter, Setter } from "jotai";
import { OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { debounce } from "@/utils";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { PolicyConv } from "./0-conv";

export namespace PolicyState {

    export type Atoms = PolicyConv.PolicyAtoms;

    export function createUiAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, onChange: OnValueChangeAny): Atoms {

        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        return {
            policyAtom: atomWithCallback('', onChange),
            policy2Atom: atomWithCallback('', onChange),
        };
    }

    function combineResultFromAtoms(atoms: Atoms, get: Getter, set: Setter) {
        const result = {
            policy: get(atoms.policyAtom),
            policy2: get(atoms.policy2Atom),
        };

        console.log('Policy atoms', JSON.stringify(result));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
