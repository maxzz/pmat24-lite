import { getDefaultStore } from "jotai";
import { type Mani, filterOneLevelEmptyValues, FormIdx, SUBMIT } from "@/store/8-manifest";
import { type AnyFormCtx, type FieldRowCtx } from "@/store/2-file-mani-atoms";
import { type OldNewField, type RecordOldNewFieldByUuid } from "../0-serve-atoms/3-do-save-mani-atom/2-pack/1-normal/9-types";

export function printFinalFields(newSubmitsByUuid: RecordOldNewFieldByUuid, doFormSubmit: SUBMIT | undefined, newSortedFields: OldNewField[]) {
    printFieldsAsTable(`Submit fields doFormSubmit=${doFormSubmit}`, newSortedFields);

    const values = Object.values(newSubmitsByUuid);
    if (values.length) {
        const items = values.map(
            (item) => (`useIt: ${item.newMani?.useit}, name: ${item.newMani?.displayname}`)
        );
        const text = JSON.stringify(items, null, 2);
        console.log('Form fields:', text);
    }
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
            add({ name: ' uuid: ',  /**/ value: `${field.meta.uuid}`,               /**/ nameCss: 'color: #ababab; font-size: 0.5rem', valueCss: 'color: darkslategray; font-size: 0.6rem' });
            add({ name: ' type: ',  /**/ value: `${m.type.padEnd(6, ' ')}`,         /**/ valueCss: m.type === 'button' ? 'color: #8eacf8' : 'color: #888888' });
            add({ name: ' useIt: ', /**/ value: m.useit ? 'true' : '    ',          /**/ valueCss: m.useit ? 'color: #00a000; font-size: 0.5rem' : 'color: #ababab; font-size: 0.5rem' });
            add({ name: ' name: ',  /**/ value: `${m.displayname || '???no name'}`, /**/ valueCss: 'color: var(--console-color-yellow); font-size: 0.6rem' });
            add({ name: '',         /**/ value: '',                                 /**/ valueCss: 'color: black' }); // the last dummy item to fix font-size
            idx !== fields.length - 1 && items.push('\n');
        }
    );

    console.log(`${label}\n${items.join('')}`, ...colors);

    function add({ name, value, nameCss, valueCss }: { name: string; value: string; valueCss?: string; nameCss?: string; }) {
        items.push(`%c${name}%c${value}`);
        colors.push(nameCss || 'color: gray');
        colors.push(valueCss || 'color: #d58e00');
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
    let text = JSON.stringify(newFields, null, 2);
    text = eatFieldsXmlNewLines(text);

    if (bodyCollapsed) {
        console.groupCollapsed(`%c${label}`, labelCss);
        console.log(`%c${text}`, bodyCss);
        console.groupEnd();
    } else {
        console.log(`%c${label}%c%s`, labelCss, bodyCss, text);
    }
}

function eatFieldsXmlNewLines(xml: string | undefined) {
    let rv = (xml || '').replace(/\s*("displayname": "[^"]+",?)/g, ' $1');
    rv = rv.replace(/\s*("type": "[^"]+",?)/g, ' $1');
    rv = rv.replace(/\s*("dbname": "[^"]+",?)/g, ' $1');
    rv = rv.replace(/\s*("useit": (true|false),?)/g, ' $1');
    rv = rv.replace(/\s*("password": (true|false),?)/g, ' $1');
    rv = rv.replace(/\s*("submit": (dosubmit|nosubmit|true|false),?)/g, ' $1');

    rv = rv.replace(/\s*("rfield": (?:"[^"]+"|\d+),?)/g, ' $1');
    rv = rv.replace(/\s*("rfieldform": (?:"[^"]+"|-?\d+),?)/g, ' $1');

    rv = rv.replace(/\s*("formIdx": (?:"[^"]+"|\d+),?)/g, ' $1');
    rv = rv.replace(/\s*("uuidThis": ("[^"]+"|\d+),?)/g, ' $1');
    rv = rv.replace(/\s*("uuidLoginFld": ("[^"]+"|\d+),?)/g, ' $1');
    rv = rv.replace(/\s*("dbnameInitial": "[^"]+",?)/g, ' $1');

    return rv;
}
