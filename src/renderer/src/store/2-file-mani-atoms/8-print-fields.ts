import { getDefaultStore } from "jotai";
import { type Mani, filterOneLevelEmptyValues, FormIdx, SUBMIT } from "@/store/8-manifest";
import { type AnyFormCtx, type FieldRowCtx } from "@/store/2-file-mani-atoms";
import { type OldNewField, type RecordOldNewFieldByUuid } from "../0-serve-atoms/3-do-save-mani-atom/2-pack/1-normal/9-types";

export function printFinalFields(newSubmitsByUuid: RecordOldNewFieldByUuid, doFormSubmit: SUBMIT | undefined, newSortedFields: OldNewField[]) {

    const values = Object.values(newSubmitsByUuid);
    if (values.length) {
        console.log('newSortedFields2', JSON.stringify(values.map(
            (item) => (`useIt: ${item.newMani?.useit}, name: ${item.newMani?.displayname}`)
        ), null, 2));
    }

    printFieldsAsTable(`newSortedFields doFormSubmit=${doFormSubmit}`, newSortedFields);
}

function printFieldsAsTable(label: string, fields: OldNewField[]) {
    const colors: string[] = [];
    const items: string[] = [];

    fields.forEach(
        (field, idx) => {
            if (!field.newMani) {
                return;
            }
            const m = field.newMani;

            items.push('   ');
            add({ name: ' type: ',  /**/ value: `${m.type.padEnd(6, ' ')}`,         /**/ colorValue: m.type === 'button' ? 'color: #8eacf8' : 'color: #888888' });
            add({ name: ' useIt: ', /**/ value: m.useit ? 'true' : '    ',          /**/ colorValue: m.useit ? 'color: #00a000' : 'color: #ababab' });
            add({ name: ' uuid: ',  /**/ value: `${field.meta.uuid}`,               /**/ colorValue: 'color: #ababab; font-size: 0.5rem' });
            add({ name: ' name: ',  /**/ value: `${m.displayname || '???no name'}`, /**/ colorValue: 'color: var(--console-color-yellow); font-size: 0.6rem' });
            add({ name: '',         /**/ value: '',                                 /**/ colorValue: 'color: black' }); // the last dummy item to fix font-size
            idx !== fields.length - 1 && items.push('\n');
        }
    );

    console.log(`${label}\n${items.join('')}`, ...colors);

    function add({ name, value, colorValue, colorName }: { name: string; value: string; colorValue?: string; colorName?: string; }) {
        items.push(`%c${name}%c${value}`);
        colors.push(colorName || 'color: gray');
        colors.push(colorValue || 'color: #d58e00');
    }
}

export function print_FormFields(label: string, fieldRowCtxs: FieldRowCtx[], formIdx: FormIdx) {
    const get = getDefaultStore().get;

    console.log(
        `${label} %c${!formIdx ? 'login (or cpass at create time)' : 'cpass'}`,
        `font-size:0.5rem; ${!formIdx ? 'color: forestgreen;' : 'color: darkseagreen;'}`
    );

    const colors: string[] = [];
    const lines: string[] = [];

    fieldRowCtxs.forEach(
        (field) => {
            lines.push(`%c        this.uuid: %c${field.metaField.uuid} %c'${get(field.labelAtom)}'`);
            colors.push('font-size:0.5rem; color: forestgreen', 'color: forestgreen', 'color: black');
        }
    );

    console.log(lines.join('\n'), ...colors);
}

export function print_FormCtx(label: string, formCtx: AnyFormCtx, formIdx: FormIdx) {
    if (formCtx.normal) {
        print_FormFields(label, formCtx.normal.rowCtxs, formIdx);
    }
}

// Packed fields

export function print_PackedFields(fields: Mani.Field[], { label, labelCss = '', bodyCss = '', bodyCollapsed = true, keepEmptyvalues }: { label: string, labelCss?: string, bodyCss?: string; bodyCollapsed?: boolean; keepEmptyvalues?: boolean }) {
    const newFields = keepEmptyvalues
        ? fields
        : fields.map(
            (field) => {
                const f = filterOneLevelEmptyValues({ ...field });
                delete f?.path_ext;
                return f;
            }
        );
    const text = JSON.stringify(newFields, null, 2);

    if (bodyCollapsed) {
        console.groupCollapsed(`%c${label}`, labelCss);
        console.log(`%c${text}`, bodyCss);
        console.groupEnd();
    } else {
        console.log(`%c${label}%c%s`, labelCss, bodyCss, text);
    }
}
