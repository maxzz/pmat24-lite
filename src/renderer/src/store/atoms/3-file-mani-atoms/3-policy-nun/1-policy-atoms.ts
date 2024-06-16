import { Getter, Setter } from "jotai";
import { debounce } from "@/utils";
import { setManiChanges } from "../9-types";
import { FileUsParams, ManiAtoms } from "../9-types";
import { PolicyConv } from "./0-conv";
import { FieldTyp } from "pm-manifest";

export namespace PolicyState {

    export type Atoms = PolicyConv.PolicyAtoms;

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): Atoms[] {

        const { fileUs, fileUsAtom, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const passwordFields = metaForm.fields.filter((f) => f.ftyp === FieldTyp.psw);
        if (!passwordFields.length) {
            return [];
        }

        const rv: Atoms[] = passwordFields.map(
            (field, policyIdx) => {
                const initialState = PolicyConv.forAtoms(field);
                const atoms = PolicyConv.createAtoms(initialState,
                    ({ get, set }) => {
                        debouncedCombinedResultFromAtoms(fileUsParams, maniAtoms, policyIdx, get, set);
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

    function combineResultFromAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms, policyIdx: number, get: Getter, set: Setter) {
        const atoms: Atoms[] = maniAtoms[fileUsParams.formIdx]!.policyAtoms;
        if (!atoms.length) {
            return;
        }

        const state = PolicyConv.fromAtoms(atoms[policyIdx], get, set);

        const changed = !PolicyConv.areTheSame(state, atoms[policyIdx].fromFile);
        atoms[policyIdx].changed = changed;

        const changes = setManiChanges(fileUsParams, changed, `${fileUsParams.formIdx?'c':'l'}-policy-${policyIdx}`);

        // this is not used anymore
        console.log('changes policy:', [...changes.keys()]);
        console.log('  state', JSON.stringify(state, null, 2));
        console.log('   file', JSON.stringify(atoms[policyIdx].fromFile, null, 2));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
