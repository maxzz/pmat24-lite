import { atom, type Getter, type Setter } from "jotai";
import { type OnValueChangeAny, debounce } from "@/utils";
import { convFieldForEditor, FieldTyp, type Meta } from "@/store/manifest";
import { NormalFieldConv } from "../2-conv-field-tems";
import { type OnChangeProps, fileUsChanges, type FileUsCtx, type FieldRowCtx, safeManiAtomsFromFileUsCtx } from "../../9-types";

export namespace NormalFieldsState {

    export function createFieldsCnt(fileUsCtx: FileUsCtx): FieldRowCtx[] {

        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = fileUs.parsedSrc.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

        const rv = nonButtonFields.map((field, idx) => mapMetaFieldToFieldRowAtoms(field, idx, fileUsCtx));
        return rv;
    }

    function mapMetaFieldToFieldRowAtoms(field: Meta.Field, idx: number, fileUsCtx: FileUsCtx): FieldRowCtx {

        function onChange({ get, set }: { get: Getter, set: Setter; }) {
            onChangeWithScopeDebounced(idx, { fileUsCtx, get, set });
        }

        const rowAtoms = createUiRowAtoms(field, onChange);
        return rowAtoms;
    }

    function createUiRowAtoms(field: Meta.Field, onChange: OnValueChangeAny): FieldRowCtx {
        const forAtoms = convFieldForEditor(field.mani);
        const rv: FieldRowCtx = {
            ...NormalFieldConv.createAtoms(forAtoms, onChange),
            metaField: field,
            fromFile: forAtoms,
            fromFcAtom: atom(),
        };
        return rv;
    }

} //namespace NormalFieldsState

function onChangeWithScope(fieldIdx: number, { fileUsCtx, get, set }: OnChangeProps) {
    const nFormCtx = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.normal;
    if (!nFormCtx) {
        return;
    }

    const rowCtx: FieldRowCtx = nFormCtx.rowCtxs[fieldIdx];

    const fromUi = NormalFieldConv.fromAtoms(rowCtx, get, set);
    const changed = !NormalFieldConv.areTheSame(fromUi, rowCtx.fromFile);
    const changes = fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-f-${fieldIdx}`);

    /** /
    const str1 = JSON.stringify(fromUi.policies, null, 2);
    const str2 = JSON.stringify(rowAtoms.fromFile.policies, null, 2);
    const str3 = changes.size ? `\nstate ${str1}\nfile ${str2}` : '';
    console.log(`%cCombineField: [${[...changes.keys()]}]%c${str3}`, 'background-color: navy; color: bisque', 'background-color: #282828; color: white');
    /**/
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
