import { type Getter, type Setter } from 'jotai';
import { convFieldForEditor, FieldTyp, type Meta } from '@/store/manifest';
import { NormalFieldConv, type NormalField } from '../1-field-items/0-conv';
import { type OnChangeProps, setManiChanges, type FileUsCtx, type ManiAtoms } from "../../9-types";
import { type OnValueChangeAny } from '@/util-hooks';
import { debounce } from '@/utils';

export namespace NormalFieldsState {

    export function createFieldsCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): NormalField.RowAtoms[] {

        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

        const rv = nonButtonFields.map(mapMetaFieldToFieldRowAtoms) || [];
        return rv;

        function mapMetaFieldToFieldRowAtoms(field: Meta.Field, idx: number): NormalField.RowAtoms {
            
            function onChange({ get, set }: { get: Getter, set: Setter }) {
                onChangeWithScopeDebounced(idx, { fileUsCtx, maniAtoms, get, set });
            }

            const rowAtoms = createUiRowAtoms(field, onChange);
            return rowAtoms;
        }
    }

    function createUiRowAtoms(field: Meta.Field, onChange: OnValueChangeAny): NormalField.RowAtoms {
        const forAtoms = convFieldForEditor(field.mani);
        return {
            ...NormalFieldConv.createAtoms(forAtoms, onChange),
            metaField: field,
            fromFile: forAtoms,
        };
    }
}

function onChangeWithScope(fieldIdx: number, { fileUsCtx, maniAtoms, get, set }: OnChangeProps) {
    const nomalFormAtoms = maniAtoms[fileUsCtx.formIdx]!.normal;
    if (!nomalFormAtoms) {
        return;
    }

    const rowAtoms: NormalField.RowAtoms = nomalFormAtoms.rowsAtoms[fieldIdx];

    const fromUi = NormalFieldConv.fromAtoms(rowAtoms, get, set);
    const changed = !NormalFieldConv.areTheSame(fromUi, rowAtoms.fromFile);
    const changes = setManiChanges(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-f-${fieldIdx}`);

    /** /
    const str1 = JSON.stringify(fromUi.policies, null, 2);
    const str2 = JSON.stringify(rowAtoms.fromFile.policies, null, 2);
    const str3 = changes.size ? `\nstate ${str1}\nfile ${str2}` : '';
    console.log(`%cCombineField: [${[...changes.keys()]}]%c${str3}`, 'background-color: navy; color: bisque', 'background-color: #282828; color: white');
    /**/
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
