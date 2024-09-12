import { type Getter, type Setter } from 'jotai';
import { fieldForEditor, FieldTyp, type Meta } from '@/store/manifest';
import { NormalFieldConv, type NormalField } from '../0-conv';
import { type OnChangeProps, setManiChanges, type FileUsCtx, type ManiAtoms } from "../../../9-types";
import { type OnValueChangeAny } from '@/util-hooks';
import { debounce } from '@/utils';

export namespace NormalFieldsState {

    export type Atoms = NormalField.FieldAtoms;

    export function createFieldsCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): Atoms[] {

        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

        function mapMetaFieldToFieldAtoms(field: Meta.Field, idx: number): Atoms {
            function onChange({ get, set }: { get: Getter, set: Setter }) {
                onChangeWithScopeDebounced(idx, { fileUsCtx, maniAtoms, get, set });
            }

            const rowAtoms = createUiAtoms(field, onChange);
            return rowAtoms;
        }

        const rv = nonButtonFields.map(mapMetaFieldToFieldAtoms) || [];
        return rv;
    }
}

function onChangeWithScope(fieldIdx: number, { fileUsCtx, maniAtoms, get, set }: OnChangeProps) {
    const nomalFormAtoms = maniAtoms[fileUsCtx.formIdx]!.normal;
    if (!nomalFormAtoms) {
        return;
    }

    const atoms: NormalField.FieldAtoms = nomalFormAtoms.fieldsAtoms[fieldIdx];

    const fromUi = NormalFieldConv.fromAtoms(atoms, get, set);
    const changed = !NormalFieldConv.areTheSame(fromUi, atoms.fromFile);
    atoms.changed = changed;

    const changes = setManiChanges(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-f-${fieldIdx}`);

    /** /
    const str1 = JSON.stringify(state.policies, null, 2);
    const str2 = JSON.stringify(atoms.fromFile.policies, null, 2);
    const str3 = changes.size ? `\nstate ${str1}\nfile ${str2}` : '';
    console.log(`%cCombineField: [${[...changes.keys()]}]%c${str3}`, 'background-color: navy; color: bisque', 'background-color: #282828; color: white');
    /**/
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);

function createUiAtoms(field: Meta.Field, onChange: OnValueChangeAny): NormalField.FieldAtoms {
    const forAtoms = fieldForEditor(field.mani);
    return {
        ...NormalFieldConv.createAtoms(forAtoms, onChange),
        metaField: field,
        fromFile: forAtoms,
        changed: false,
    };
}
