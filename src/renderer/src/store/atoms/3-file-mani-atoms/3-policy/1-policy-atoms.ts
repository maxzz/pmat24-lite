import { Getter, Setter } from "jotai";
import { debounce } from "@/utils";
import { setManiChanges } from "../9-types";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { PolicyConv } from "./0-conv";
import { FieldTyp } from "pm-manifest";

export namespace PolicyState {

    export type Atoms = PolicyConv.PolicyAtoms;

    export function createUiAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms[] {

        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const passwordFields = metaForm.fields.filter((f) => f.ftyp === FieldTyp.psw);
        if (!passwordFields.length) {
            return [];
        }

        const rv: Atoms[] = passwordFields.map(
            (field, policyIdx) => {
                const initialState = PolicyConv.forAtoms(field);
                const atoms = PolicyConv.toAtoms(initialState,
                    ({ get, set }) => {
                        debouncedCombinedResultFromAtoms(createAtomsParams, callbackAtoms, policyIdx, get, set);
                    }
                );
                return {
                    ...atoms,
                    maniField: field.mani,
                    fromFile: initialState,
                    changed: false,
                };
            }
        );

        return rv;
    }

    function combineResultFromAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, policyIdx: number, get: Getter, set: Setter) {
        const atoms: Atoms[] = callbackAtoms[createAtomsParams.formIdx]!.policyAtoms;
        if (!atoms.length) {
            return;
        }

        const state = PolicyConv.fromAtoms(atoms[policyIdx], get, set);

        const changed = !PolicyConv.areTheSame(state, atoms[policyIdx].fromFile);
        atoms[policyIdx].changed = changed;

        const changes = setManiChanges(createAtomsParams, changed, `${createAtomsParams.formIdx?'c':'l'}-policy-${policyIdx}`);

        console.log('changes policy:', [...changes.keys()]);
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
