import { FieldTyp, type Meta } from '@/store/manifest';
import { type NormalField } from '../0-conv';
import { type FileUsParams, type ManiAtoms } from "../../../9-types";
import { NormalFieldState } from './2-field-atoms';

export namespace NormalFieldsState {

    export type Atoms = NormalField.FieldAtoms;

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): Atoms[] {

        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

        function mapMetaFieldToFieldAtoms(field: Meta.Field, idx: number): Atoms {

            function onChange({ get, set }) {
                return NormalFieldState.debouncedOnChange(idx, { fileUsParams, maniAtoms, get, set });
            }

            const rowAtoms = NormalFieldState.createUiAtoms(field, onChange);
            return rowAtoms;
        }

        const rv = nonButtonFields.map(mapMetaFieldToFieldAtoms) || [];
        return rv;
    }
}
