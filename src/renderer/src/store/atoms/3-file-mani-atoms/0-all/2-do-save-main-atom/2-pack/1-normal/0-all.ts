import { type Mani, FormIdx, SUBMIT } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type SubmitFieldTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { type ByUuid } from "./9-types";
import { getNormalSubmitValues } from "./2-get-normal-submit-values";
import { getNormalFieldValues } from "./1-get-normal-field-values";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { mergeToManiField } from "./7-merge-to-mani-field";
import { printFields } from "./8-print-fields";

type PackNormalFieldsAndSubmitResult = {
    newFields: Mani.Field[];
    submittype: SUBMIT | undefined; // this is form sumbit type 'dosubmit', 'nosubmit' or undefined
};

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams): PackNormalFieldsAndSubmitResult {

    const allByUuid = getByUiidAllFields(packParams, formIdx);
    const newRowFieldsByUuid = getByUuidNewFields(formCtx, packParams);
    const { newSubmitsByUuid, doFormSubmit } = getSubmitsByUuid(formCtx, packParams);

    const rv: ByUuid = {
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

    printFinalFields(newSubmitsByUuid, doFormSubmit, newSortedFields);

    const newFields = newSortedFields.map((field) => field.newMani!);

    return {
        newFields,
        submittype: doFormSubmit,
    };
}

function printFinalFields(newSubmitsByUuid: ByUuid, doFormSubmit: SUBMIT | undefined, newSortedFields) {
    const values = Object.values(newSubmitsByUuid);

    if (values.length) {
        console.log('newSortedFields2', JSON.stringify(values.map(
            (item) => (`useIt: ${item.newMani?.useit}, name: ${item.newMani?.displayname}`)
        ), null, 2));
    }

    printFields(`newSortedFields doFormSubmit=${doFormSubmit}`, newSortedFields);
}

function getByUiidAllFields(packParams: PackManifestDataParams, formIdx: FormIdx): ByUuid {
    const metaForm = packParams.fileUs.parsedSrc.meta?.[formIdx]; // we are guarded here by context, but still they come...
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

function getByUuidNewFields(formCtx: NFormCtx, packParams: PackManifestDataParams): ByUuid {
    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    const newRowFieldsByUuid: ByUuid = editAndMeta.reduce<ByUuid>(
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

function getSubmitsByUuid(formCtx: NFormCtx, packParams: PackManifestDataParams): { newSubmitsByUuid: ByUuid; doFormSubmit: SUBMIT | undefined; } {
    const submitsValues: SubmitFieldTypes.ForAtoms = getNormalSubmitValues(formCtx, packParams);

    let selected = submitsValues.selected;
    let doFormSubmit: SUBMIT | undefined;

    if (formCtx.submitCtx.isWeb) { //NOTE: for web forms we don't clean up useIt for submit and buttons. They are ignore by browser extension.
        doFormSubmit = !!selected ? SUBMIT.dosumbit : SUBMIT.nosumbit;
        selected = -1;
    }

    const newSubmitsByUuid: ByUuid = submitsValues.buttonNameItems.reduce<ByUuid>(
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
