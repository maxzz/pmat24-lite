import { type Mani, FormIdx, SUBMIT } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type SubmitFieldTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { type MapByUuid } from "./9-types";
import { getNormalSubmitValues } from "./2-get-normal-submit-values";
import { getNormalFieldValues } from "./1-get-normal-field-values";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { mergeToManiField } from "./7-merge-to-mani-field";
import { printFieldsAsTable } from "./8-print-fields";

type PackNormalFieldsAndSubmitResult = {
    newFields: Mani.Field[];
    submittype: SUBMIT | undefined; // this is form sumbit type 'dosubmit', 'nosubmit' or undefined
};

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams): PackNormalFieldsAndSubmitResult {

    const allByUuid = getByUiidAllFields(packParams, formIdx);
    const newRowFieldsByUuid = getByUuidNewFields(formCtx, packParams);
    const { newSubmitsByUuid, doFormSubmit } = getSubmitsByUuid(formCtx, packParams);

    const rv: MapByUuid = {
        ...allByUuid,
        ...newRowFieldsByUuid,
        ...newSubmitsByUuid,
    };

    Object.entries(rv).forEach(
        ([uuid, field]) => {
            if (!field.newMani) {
                field.newMani = field.meta.mani; // If field is not changed in any editor, keep the old one
            }
        }
    );

    const newSortedFields = Object.entries(rv)
        .sort(([uuid1, field1], [uuid2, field2]) => field1.meta.pidx - field2.meta.pidx)
        .map(([uuid, field]) => field);

    //printFinalFields(newSubmitsByUuid, doFormSubmit, newSortedFields);

    const newFields = newSortedFields.map((field) => field.newMani!);

    return {
        newFields,
        submittype: doFormSubmit,
    };
}

function printFinalFields(newSubmitsByUuid: MapByUuid, doFormSubmit: SUBMIT | undefined, newSortedFields) {
    const values = Object.values(newSubmitsByUuid);

    if (values.length) {
        console.log('newSortedFields2', JSON.stringify(values.map(
            (item) => (`useIt: ${item.newMani?.useit}, name: ${item.newMani?.displayname}`)
        ), null, 2));
    }

    printFieldsAsTable(`newSortedFields doFormSubmit=${doFormSubmit}`, newSortedFields);
}

/**
 * Get all fields from meta form
 */
function getByUiidAllFields(packParams: PackManifestDataParams, formIdx: FormIdx): MapByUuid {
    const metaForm = packParams.fileUs.parsedSrc.meta?.[formIdx]; // we are guarded here by context, but still they come...
    if (!metaForm) {
        return {};
    }

    const allByUuid: MapByUuid = metaForm.fields.reduce<MapByUuid>(
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

/**
 * Get new fields created by editors and assign them new Mani.Field
 */
function getByUuidNewFields(formCtx: NFormCtx, packParams: PackManifestDataParams): MapByUuid {
    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    const newRowFieldsByUuid: MapByUuid = editAndMeta.reduce<MapByUuid>(
        (acc, { metaField, editField }) => {

            const newField: Mani.Field = mergeToManiField({
                from: editField,
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

/**
 * Get submit type
 */
function getSubmitsByUuid(formCtx: NFormCtx, packParams: PackManifestDataParams): { newSubmitsByUuid: MapByUuid; doFormSubmit: SUBMIT | undefined; } {
    const submitsValues: SubmitFieldTypes.ForAtoms = getNormalSubmitValues(formCtx, packParams);

    let selected = submitsValues.selected;
    let doFormSubmit: SUBMIT | undefined;

    if (formCtx.submitCtx.isWeb) { //NOTE: for web forms we don't clean up useIt for submit and buttons. They are ignore by browser extension.
        doFormSubmit = !!selected ? SUBMIT.dosumbit : SUBMIT.nosumbit;
        selected = -1;
    }

    const newSubmitsByUuid: MapByUuid = submitsValues.buttonNameItems.reduce<MapByUuid>(
        (acc, field, idx) => {
            if (field.metaField) { // metaField is empty for 'Do not submit' and 'Submit' buttons
                acc[field.metaField.uuid] = {
                    meta: field.metaField,
                    newMani: duplicateManiField({ field: field.metaField.mani, useIt: idx === selected }),
                };
            }
            return acc;
        }, {}
    );

    return {
        newSubmitsByUuid,
        doFormSubmit,
    };
}
