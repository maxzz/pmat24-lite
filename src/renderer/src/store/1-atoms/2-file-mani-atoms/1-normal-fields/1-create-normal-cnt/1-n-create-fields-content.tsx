import { atom } from "jotai";
import { type OnValueChangeAny, debounce } from "@/utils";
import { type Meta, convFieldForEditor, FieldTyp } from "@/store/manifest";
import { type FileUsCtx, type OnChangeProps, fileUsChanges, type FieldRowCtx, safeManiAtomsFromFileUsCtx, safeByContext } from "../../9-types";
import { NormalFieldConv } from "../2-conv-field-tems";

export namespace NormalFieldsState {

    export function createFieldsCnt(fileUsCtx: FileUsCtx): FieldRowCtx[] {
        const { fileUs, formIdx } = fileUsCtx;
        const metaForm = safeByContext(fileUs?.parsedSrc?.meta)[formIdx]; // We are under createFormAtoms umbrella
        const nonButtonFields = (metaForm?.fields || []).filter((field) => field.ftyp !== FieldTyp.button);

        const rv = nonButtonFields.map((field, idx) => createNormalAtomsForRow(field, idx, fileUsCtx));
        return rv;
    }

} //namespace NormalFieldsState

function createNormalAtomsForRow(field: Meta.Field, fieldIdx: number, fileUsCtx: FileUsCtx): FieldRowCtx {
    const debouncedOnChangeWithScope = debounce(onChangeWithScope);

    function onChange({ get, set }: GetSet) {
        debouncedOnChangeWithScope(fieldIdx, { fileUsCtx, get, set });
    }

    const rv = createUiRowAtoms(field, onChange);
    return rv;
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

// Callback

function onChangeWithScope(fieldIdx: number, { fileUsCtx, get, set }: OnChangeProps) {
    const nFormCtx = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.normal;
    if (!nFormCtx) {
        return;
    }

    const rowCtx: FieldRowCtx = nFormCtx.rowCtxs[fieldIdx];

    const fromUi = NormalFieldConv.fromAtoms(rowCtx, { get });
    const changed = !NormalFieldConv.areTheSame(fromUi, rowCtx.fromFile);
    const changes = fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-f-${fieldIdx}`);

    /** /
    const str1 = JSON.stringify(fromUi.policies, null, 2);
    const str2 = JSON.stringify(rowAtoms.fromFile.policies, null, 2);
    const str3 = changes.size ? `\nstate ${str1}\nfile ${str2}` : '';
    console.log(`%cCombineField: [${[...changes.keys()]}]%c${str3}`, 'background-color: navy; color: bisque', 'background-color: #282828; color: white');
    /**/
}
