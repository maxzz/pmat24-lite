import { type Mani, type Meta, FormIdx } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type SubmitConvTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { type ByUuid } from "./9-types";
import { getNormalSubmitValues } from "./2-get-normal-submit-values";
import { getNormalFieldValues } from "./1-get-normal-field-values";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { mergeToManiField } from "./7-merge-to-mani-field";

function getAllByUiid(packParams: PackManifestDataParams, formIdx: FormIdx): ByUuid {
    const metaForm = packParams.fileUs.meta?.[formIdx]; // we are guarded here by context, but still they come...
    if (!metaForm) {
        return {};
    }

    const allByUuid: ByUuid = metaForm.fields.reduce<ByUuid>(
        (acc, metaField) => {
            acc[metaField.uuid] = {
                meta: metaField,
                newMani: undefined,
            };
            return acc;
        }, {}
    );

    return allByUuid;
}

function getFieldsByUuid(formCtx: NFormCtx, packParams: PackManifestDataParams): ByUuid {
    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    const newRowFieldsByUuid: ByUuid = editAndMeta.reduce<ByUuid>(
        (acc, editorField) => {
            const metaField = editorField.metaField;

            const newField: Mani.Field = mergeToManiField({
                from: editorField.editField,
                maniField: metaField.mani,
                ftyp: metaField.ftyp,
                rdir: undefined,
                isSubmit: false,
            });

            acc[metaField.uuid] = {
                meta: metaField,
                newMani: newField,
            };

            return acc;
        }, {}
    );

    return newRowFieldsByUuid;
}

function getSubmitsByUuid(formCtx: NFormCtx, packParams: PackManifestDataParams): { byUuid: ByUuid; doFormSubmit: string | undefined; } {
    const submitsValues: SubmitConvTypes.SubmitForAtoms = getNormalSubmitValues(formCtx, packParams);

    let selected = submitsValues.selected;
    let doFormSubmit: string | undefined;

    if (formCtx.submitAtoms.isWeb) {
        selected = -1;
        doFormSubmit = !selected ? 'dosubmit' : 'nosubmit';
    }

    const newSubmitsByUuid: ByUuid = submitsValues.buttonNameItems.reduce<ByUuid>(
        (acc, field, idx) => {
            if (field.metaField) { // this will skip the first 'Do no submit' item
                acc[field.metaField.uuid] = {
                    meta: field.metaField,
                    newMani: duplicateManiField({ field: field.metaField.mani, useIt: idx === selected }),
                };
            }
            return acc;
        }, {}
    );

    console.log(`new-submits doFormSubmit=${doFormSubmit}`, JSON.stringify(Object.values(newSubmitsByUuid).map((item) => ({ name: item.newMani?.displayname, useIt: item.newMani?.useit, })), null, 2));

    return {
        byUuid: newSubmitsByUuid,
        doFormSubmit,
    };
}

type PackNormalFieldsAndSubmitResult = {
    newFields: Mani.Field[];
    submittype: string | undefined; // this is form sumbit type 'dosubmit', 'nosubmit' or undefined
};

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams): PackNormalFieldsAndSubmitResult {

    const allByUuid = getAllByUiid(packParams, formIdx);
    const newRowFieldsByUuid = getFieldsByUuid(formCtx, packParams);
    const { byUuid: newSubmitsByUuid, doFormSubmit } = getSubmitsByUuid(formCtx, packParams);

    // 3. Merge

    const rv: ByUuid = {
        ...allByUuid,
        ...newRowFieldsByUuid,
        ...newSubmitsByUuid,
    };

    Object.entries(rv)
        .forEach(
            ([uuid, field]) => {
                if (!field.newMani) {
                    field.newMani = field.meta.mani; // if field is not changed in any editor, keep the old one
                }
            }
        );

    const newSortedFields =
        Object.entries(rv)
            .sort(([uuid1, field1], [uuid2, field2]) => field1.meta.pidx - field2.meta.pidx)
            .map(([_, field]) => field);

    printFields('newSortedFields', newSortedFields);

    const newFields = newSortedFields.map((field) => field.newMani!);

    return {
        newFields,
        submittype: doFormSubmit,
    };
}

function printFields(label: string, fields: { meta: Meta.Field; newMani: Mani.Field | undefined; }[]) {
    const colors: string[] = [];
    const items: string[] = [];

    function addItem({ name, value, colorValue, colorName }: { name: string; value: string; colorValue?: string; colorName?: string; }) {
        items.push(`%c${name}%c${value}`);
        colors.push(colorName || 'color: gray');
        colors.push(colorValue || 'color: #d58e00');
    }

    fields.forEach(
        (field, idx) => {
            if (!field.newMani) {
                return;
            }
            const m = field.newMani;

            items.push('   ');
            addItem({ name: ' type: ', value: `${m.type.padEnd(6, ' ')}`, colorValue: m.type === 'button' ? 'color: #8eacf8' : 'color: #888888' });
            addItem({ name: ' useIt: ', value: m.useit ? 'true' : '    ', colorValue: m.useit ? 'color: #00a000' : 'color: #ababab' });
            addItem({ name: ' uuid: ', value: `${field.meta.uuid}`, colorValue: 'color: #ababab; font-size: 0.5rem' });
            addItem({ name: ' name: ', value: `${m.displayname || '???no name'}`, colorValue: 'color: var(--console-color-yellow); font-size: 0.6rem' });
            addItem({ name: '', value: '', colorValue: 'color: black' }); // the last dummy item to fix font-size
            idx !== fields.length - 1 && items.push('\n');
        }
    );

    console.log(`${label}\n${items.join('')}`, ...colors);
}
