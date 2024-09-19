import { type Mani, FormIdx } from "@/store/manifest";
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

    // const lines = newSortedFields.map(
    //     (field) => {
    //         if (!field.newMani) {
    //             return `no mani`;
    //         }
    //         const m = field.newMani;
    //         return {
    //             type: m.type === 'button' ? '   btn' : `${m.type.padEnd(6, ' ')}`,
    //             useIt: m.useit ? 'true' : '    ',
    //             uuid: `${field.meta.uuid}`,
    //             name: `${m.displayname || '???no name'}`
    //         };
    //     }
    // );
    // lines.forEach((item) => console.log(item));

    const allColors: string[] = [];
    const allItems: string[] = [];

    function addColor(name: string, value: string, color: string) {
        allItems.push(`%c${name}%c${value}`);
        allColors.push('color: gray');
        allColors.push(color);
    }

    addColor('type', 'useIt', 'color: red');
    addColor('type2', 'useIt', 'color: red');

    console.log(allItems.join(''), ...allColors);

    // const items = ['color: red', 'color: blue'];
    // console.log('%ca%ca', ...items);

    const newFields = newSortedFields.map((field) => field.newMani!);

    return {
        newFields,
        submittype: doFormSubmit,
    };
}
