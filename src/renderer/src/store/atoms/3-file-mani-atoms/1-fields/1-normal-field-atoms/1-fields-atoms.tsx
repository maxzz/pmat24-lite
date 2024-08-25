import { FieldTyp, Meta, parseForEditor } from '@/store/manifest';
import { type NormalField } from './0-conv';
import { NormalFieldState } from './2-field-atoms';
import { FileUsParams, ManiAtoms } from "../../9-types";

export namespace NormalFieldsState {

    export type Atoms = NormalField.FieldAtoms;

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): Atoms[] {

        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

        if (fileUsParams.isManual) {
            const manualFields = parseForEditor(fields);
            console.log('manualFields', manualFields);
        }


        function mapMetaFieldToFieldAtoms(field: Meta.Field, idx: number): Atoms {
            const rowAtoms = NormalFieldState.createUiAtoms(field,
                ({ get, set }) => {
                    return NormalFieldState.debouncedCombinedResultFromAtoms(fileUsParams, maniAtoms, idx, get, set);
                }
            );
            return rowAtoms;
        }

        const rv = nonButtonFields.map(mapMetaFieldToFieldAtoms) || [];
        return rv;
    }

    // function combineResultFromAtoms(atoms: Atoms[], get: Getter, set: Setter) {
    //     atoms.forEach((atom) => {
    //         FieldRowState.debouncedCombinedResultFromAtoms(atom, get, set);
    //     });

    //     //TODO: there cannot be a return value, so each atom must do its own thing

    //     //console.log('TableRow atoms', JSON.stringify(result));
    // }

    // export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
