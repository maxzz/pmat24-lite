import { getDefaultStore } from "jotai";
import { type Mani, filterOneLevelEmptyValues, FormIdx, SUBMIT } from "@/store/8-manifest";
import { type AnyFormCtx, type FieldRowCtx } from "@/store/2-file-mani-atoms";
import { type OldNewField, type RecordOldNewFieldByUuid } from "../0-serve-atoms/3-do-save-mani-atom/2-pack/1-normal/9-types";
import { type PackManifestDataParams } from "../0-serve-atoms/3-do-save-mani-atom/2-pack/9-types";

export function printFinalFields(newSortedFields: OldNewField[], newSubmitsByUuid: RecordOldNewFieldByUuid, doFormSubmit: SUBMIT | undefined, { label, labelCss = '', bodyCollapsed = true }: { label: string; labelCss?: string; bodyCollapsed?: boolean; }) {
    if (label) {
        console[bodyCollapsed ? 'groupCollapsed' : 'group'](`%c${label}`, labelCss);
    }

    printFieldsAsTable(newSortedFields, { label: 'Fields:', labelCss: 'color: dimgray; font-size:0.6rem;' });

    console.log(`%cForm submit: doFormSubmit=${doFormSubmit}`, 'color: dimgray; font-size:0.6rem;');

    const values = Object.values(newSubmitsByUuid);
    if (values.length) {
        const items = values.map(
            (item) => (`useIt: ${item.newMani?.useit}, name: ${item.newMani?.displayname}`)
        );
        const text = JSON.stringify(items, null, 2);
        console.log('%cAvalailable Submit buttons:%s', 'color: dimgray; font-size:0.6rem;', text);
    }

    if (label) {
        console.groupEnd();
    }
}

function printFieldsAsTable(fields: OldNewField[], { label, labelCss = '' }: { label: string; labelCss?: string; }) {
    const colors: string[] = [];
    const items: string[] = [];

    fields.forEach(
        (field: OldNewField, idx: number) => {
            if (!field.newMani) {
                return;
            }
            const m: Mani.Field = field.newMani;
            const maniUuid = m.memOnly.uuidThis;
            const metaUuid = field.meta.uuid;

            items.push('   ');
            add({ name: ' uuid.meta: ',  /**/ value: `${metaUuid}`,                      /**/ nameCss: 'color: #ababab; font-size: 0.5rem', valueCss: 'color: darkslategray; font-size: 0.6rem' });
            add({ name: ' uuid.mani: ',  /**/ value: `${maniUuid}`,                      /**/ nameCss: 'color: #ababab; font-size: 0.5rem', valueCss: 'color: darkslategray; font-size: 0.6rem' });
            add({ name: ' type: ',       /**/ value: `${m.type.padEnd(6, ' ')}`,         /**/ valueCss: m.type === 'button' ? 'color: #8eacf8' : 'color: #888888' });
            add({ name: ' useIt: ',      /**/ value: m.useit ? 'true' : '    ',          /**/ valueCss: m.useit ? 'color: #00a000; font-size: 0.5rem' : 'color: #ababab; font-size: 0.5rem' });
            add({ name: ' name: ',       /**/ value: `${m.displayname || '???no name'}`, /**/ valueCss: 'color: var(--console-color-yellow); font-size: 0.6rem' });
            add({ name: '',              /**/ value: '',                                 /**/ valueCss: 'color: black' }); // the last dummy item to fix font-size
            idx !== fields.length - 1 && items.push('\n');
        }
    );

    console.log(`%c${label}\n%c${items.join('')}`, labelCss, '', ...colors);

    function add({ name, value, nameCss, valueCss }: { name: string; value: string; valueCss?: string; nameCss?: string; }) {
        items.push(`%c${name}%c${value}`);
        colors.push(nameCss || 'color: gray');
        colors.push(valueCss || 'color: #d58e00');
    }
}

// Form fields

export function print_FormFields(fieldRowCtxs: FieldRowCtx[], formIdx: FormIdx, { label, labelCss = '', bodyCollapsed = true }: { label: string; labelCss?: string; bodyCollapsed?: boolean; }) {
    const get = getDefaultStore().get;

    const groupText = `${label} %c${!formIdx ? 'login' : 'cpass'}`;
    console[bodyCollapsed ? 'groupCollapsed' : 'group'](groupText, `font-size:0.5rem; ${!formIdx ? 'color: forestgreen;' : 'color: darkseagreen;'}`);

    // Print fields

    const colors: string[] = [];
    const lines: string[] = [];

    fieldRowCtxs.forEach(
        (field) => {
            lines.push(`%c        this.uuid: %c${field.metaField.uuid} %c'${get(field.labelAtom)}'`);
            colors.push(
                'color: dimgray; font-size:0.5rem;',
                'color: green; font-size:0.6rem;',
                'color: black',
            );
        }
    );

    console.log(lines.join('\n'), ...colors);

    console.groupEnd();
}

export function print_FormCtx(formCtx: AnyFormCtx, formIdx: FormIdx, { label, labelCss = '', bodyCollapsed = true }: { label: string; labelCss?: string; bodyCollapsed?: boolean; }) {
    if (formCtx.normal) {
        print_FormFields(formCtx.normal.rowCtxs, formIdx, { label, labelCss, bodyCollapsed });
    }
}

// Packed fields

export function print_PackedFields(fields: Mani.Field[], { label, labelCss = '', bodyCss = '', bodyCollapsed = true, keepEmptyvalues }: { label: string, labelCss?: string, bodyCss?: string; bodyCollapsed?: boolean; keepEmptyvalues?: boolean; }) {
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
    text = eatFieldsJsonNewLines(text);

    if (bodyCollapsed) {
        console.groupCollapsed(`%c${label}`, labelCss);
        console.log(`%c${text}`, bodyCss);
        console.groupEnd();
    } else {
        console.log(`%c${label}%c%s`, labelCss, bodyCss, text);
    }
}

function eatFieldsJsonNewLines(xml: string | undefined) {
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

// Meta fields

export function print_ManiMetaFields(packParams: PackManifestDataParams, formIdx: FormIdx, { fullBody = false, label, labelCss = '', bodyCss = '', bodyCollapsed = true }: { fullBody?: boolean; label: string; labelCss?: string; bodyCss?: string; bodyCollapsed?: boolean; }) {
    const metaForm = packParams.fileUs.parsedSrc.meta?.[formIdx]; // we are guarded here by context, but still they come...
    if (!metaForm) {
        return;
    }

    const onlyManiFields = fullBody ? metaForm.fields : metaForm.fields.map((field) => field.mani);
    
    let text = JSON.stringify(onlyManiFields, null, 2);
    text = eatFieldsJsonNewLines(text);

    if (bodyCollapsed) {
        console.groupCollapsed(`%c${label}`, labelCss);
        console.log(`%c${text}`, bodyCss);
        console.groupEnd();
    } else {
        console.log(`%c${label}%c%s`, labelCss, bodyCss, text);
    }
}
