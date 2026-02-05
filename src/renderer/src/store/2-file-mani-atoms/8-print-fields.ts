import { getDefaultStore } from "jotai";
import { type Mani, filterOneLevelEmptyValues, FormIdx, SUBMIT } from "@/store/8-manifest";
import { type AnyFormCtx, type FieldRowCtx } from "@/store/2-file-mani-atoms";
import { type OldNewField, type RecordOldNewFieldByUuid } from "../0-serve-atoms/3-do-save-mani-atom/2-pack/1-normal/9-types";
import { type PackManifestDataParams } from "../0-serve-atoms/3-do-save-mani-atom/2-pack/9-types";
import { type PrintCollapsedText, eatFieldsJsonNewLines, print_CollapsedText } from "./8-print-utils";

export function print_FinalFields(newSortedFields: OldNewField[], newSubmitsByUuid: RecordOldNewFieldByUuid, doFormSubmit: SUBMIT | undefined, styles: Omit<PrintCollapsedText, 'bodyCss'>) {
    const { label, labelCss, expandBody } = styles;

    if (label) {
        console[expandBody ? 'group' : 'groupCollapsed'](`%c${label}`, labelCss || '');
    }

    print_FieldsAsTable(newSortedFields, { label: 'Fields:', labelCss: 'color: dimgray; font-size:0.6rem;' });

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

function print_FieldsAsTable(fields: OldNewField[], { label, labelCss }: Omit<PrintCollapsedText, 'bodyCss' | 'expandBody'>) {
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
            add({ name: ' uuid.mani: ',  /**/ value: `${maniUuid}`,                      /**/ nameCss: 'color: #ababab; font-size: 0.5rem', valueCss: 'color: darkslategray; font-size: 0.6rem' });
            add({ name: ' uuid.meta: ',  /**/ value: `${metaUuid}`,                      /**/ nameCss: 'color: #ababab; font-size: 0.5rem', valueCss: 'color: darkslategray; font-size: 0.6rem' });
            add({ name: ' type: ',       /**/ value: `${m.type.padEnd(6, ' ')}`,         /**/ valueCss: m.type === 'button' ? 'color: #8eacf8' : 'color: #888888' });
            add({ name: ' useIt: ',      /**/ value: m.useit ? 'true' : '    ',          /**/ valueCss: m.useit ? 'color: #00a000; font-size: 0.5rem' : 'color: #ababab; font-size: 0.5rem' });
            add({ name: ' name: ',       /**/ value: `${m.displayname || '???no name'}`, /**/ valueCss: 'color: var(--console-color-yellow); font-size: 0.6rem' });
            add({ name: '',              /**/ value: '',                                 /**/ valueCss: 'color: black' }); // the last dummy item to fix font-size
            idx !== fields.length - 1 && items.push('\n');
        }
    );

    console.log(`%c${label}\n%c${items.join('')}`, labelCss || '', '', ...colors);

    function add({ name, value, nameCss, valueCss }: { name: string; value: string; valueCss?: string; nameCss?: string; }) {
        items.push(`%c${name}%c${value}`);
        colors.push(nameCss || 'color: gray');
        colors.push(valueCss || 'color: #d58e00');
    }
}

// Form fields

export function print_FormFields(fieldRowCtxs: FieldRowCtx[], formIdx: FormIdx, { label, labelCss, expandBody }: Omit<PrintCollapsedText, 'bodyCss'>) {
    const get = getDefaultStore().get;

    const groupText = `${label} %c${!formIdx ? 'login' : 'cpass'}`;
    console[expandBody ? 'group' : 'groupCollapsed'](groupText, `font-size:0.5rem; ${!formIdx ? 'color: forestgreen;' : 'color: darkseagreen;'}`);

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

function print_FormCtx(formCtx: AnyFormCtx, formIdx: FormIdx, styles: Omit<PrintCollapsedText, 'bodyCss'>) {
    if (formCtx.normal) {
        print_FormFields(formCtx.normal.rowCtxs, formIdx, styles);
    }
}

export function print_FormCtxs(loginFormCtx: AnyFormCtx | undefined, cpassFormCtx: AnyFormCtx | undefined) {
    if (loginFormCtx) {
        print_FormCtx(loginFormCtx, FormIdx.login, { label: '💻 createManiAtoms.login', labelCss: 'color: dimgray; font-size:0.6rem;', expandBody: false });
    }
    if (cpassFormCtx) {
        print_FormCtx(cpassFormCtx, FormIdx.cpass, { label: '💻 createManiAtoms.cpass', labelCss: 'color: dimgray; font-size:0.6rem;', expandBody: true });
    }
}

// Packed fields

export function print_PackedFields(fields: Mani.Field[], { label, labelCss = '', bodyCss = '', expandBody, keepEmptyvalues }: { keepEmptyvalues?: boolean; } & PrintCollapsedText) {
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

    print_CollapsedText(text, { label, labelCss, bodyCss, expandBody });
}

// Meta fields

export function print_ManiMetaFields(packParams: PackManifestDataParams, formIdx: FormIdx, { fullBody = false, label, labelCss = '', bodyCss = '', expandBody }: { fullBody?: boolean; } & PrintCollapsedText) {
    const metaForm = packParams.fileUs.parsedSrc.meta?.[formIdx]; // we are guarded here by context, but still they come...
    if (!metaForm) {
        return;
    }

    const onlyManiFields = fullBody ? metaForm.fields : metaForm.fields.map((field) => field.mani);
    
    let text = JSON.stringify(onlyManiFields, null, 2);
    text = eatFieldsJsonNewLines(text);

    print_CollapsedText(text, { label, labelCss, bodyCss, expandBody });
}
