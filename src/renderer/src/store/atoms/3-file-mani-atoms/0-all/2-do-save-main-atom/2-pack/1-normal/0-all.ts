import { type Mani, FormIdx, SUBMIT } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type SubmitFieldTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { type RecordOldNewFieldByUuid } from "./9-types";
import { getNormalSubmitValues } from "./2-get-normal-submit-values";
import { getNormalFieldValues } from "./1-get-normal-field-values";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { mergeToManiField } from "./7-merge-to-mani-field";
import { printFinalFields } from "./8-print-fields";

type PackResult = {
    newFields: Mani.Field[];
    submittype: SUBMIT | undefined; // this is form sumbit type 'dosubmit', 'nosubmit' or undefined
};

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams): PackResult {

    const allByUuid = getByUiidAllFields(packParams, formIdx);
    const newRowFieldsByUuid = getByUuidNewFields(formCtx, packParams);
    const { newSubmitsByUuid, doFormSubmit } = getSubmitsByUuid(formCtx, packParams);

    const combinedFields: RecordOldNewFieldByUuid = {
        ...allByUuid,
        ...newRowFieldsByUuid,
        ...newSubmitsByUuid,
    };

    Object.entries(combinedFields).forEach(
        ([uuid, field]) => { field.newMani = field.newMani || field.meta.mani; } // If field is not changed/reclaimed by any editor, keep the old one
    );

    const newSortedFields = Object
        .entries(combinedFields)
        .sort(([uuid1, field1], [uuid2, field2]) => field1.meta.pidx - field2.meta.pidx)
        .map(([uuid, field]) => field);

    printFinalFields(newSubmitsByUuid, doFormSubmit, newSortedFields);

    const newFields = newSortedFields.map((field) => field.newMani!);

    return {
        newFields,
        submittype: doFormSubmit,
    };
}

/**
 * Get all fields from meta form
 */
function getByUiidAllFields(packParams: PackManifestDataParams, formIdx: FormIdx): RecordOldNewFieldByUuid {
    const metaForm = packParams.fileUs.parsedSrc.meta?.[formIdx]; // we are guarded here by context, but still they come...
    if (!metaForm) {
        return {};
    }

    const allByUuid: RecordOldNewFieldByUuid = metaForm.fields.reduce<RecordOldNewFieldByUuid>(
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
function getByUuidNewFields(formCtx: NFormCtx, packParams: PackManifestDataParams): RecordOldNewFieldByUuid {
    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    const newRowFieldsByUuid: RecordOldNewFieldByUuid = editAndMeta.reduce<RecordOldNewFieldByUuid>(
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
function getSubmitsByUuid(formCtx: NFormCtx, packParams: PackManifestDataParams): { newSubmitsByUuid: RecordOldNewFieldByUuid; doFormSubmit: SUBMIT | undefined; } {
    const submitsValues: SubmitFieldTypes.ForAtoms = getNormalSubmitValues(formCtx, packParams);

    let selected = submitsValues.selected;
    let doFormSubmit: SUBMIT | undefined;

    if (formCtx.submitCtx.isWeb) { //NOTE: for web forms we don't clean up useIt for submit and buttons. They are ignore by browser extension.
        doFormSubmit = !!selected ? SUBMIT.dosumbit : SUBMIT.nosumbit;
        selected = -1;
    }

    const newSubmitsByUuid: RecordOldNewFieldByUuid = submitsValues.buttonNameItems.reduce<RecordOldNewFieldByUuid>(
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
