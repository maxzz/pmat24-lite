import { type Mani, type Meta, FormIdx } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type EditorFieldAndMeta } from "./1-get-normal-field-values";
import { type SubmitConvTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { getNormalSubmitValues } from "./2-get-normal-submit-values";
import { getNormalFieldValues } from "./1-get-normal-field-values";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { mergeManiFields } from "./7-merge-mani-fields";

type ByUuid = {
    [uuid: string]: {
        meta: Meta.Field,
        newMani: Mani.Field,
    }
};

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams) {

    // 1. Fields

    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    const newRowFieldsByUuid: ByUuid = editAndMeta.reduce<ByUuid>(
        (acc, editorField) => {
            const metaField = editorField.metaField;

            const newField: Mani.Field = mergeManiFields({
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

    // 2. Submits

    const submitsValues: SubmitConvTypes.SubmitForAtoms = getNormalSubmitValues(formCtx, packParams);

    const selected = submitsValues.selected;

    if (formCtx.submitAtoms.isWeb) {

    } else {

    }

    const newSubmitFields = submitsValues.buttonNameItems.map(
        (submit) => {
            return {
                name: submit.name,
                field: submit.metaField?.mani && duplicateManiField(submit.metaField?.mani),
            };
        }
    );

    const newSubmitsByUuid: ByUuid = submitsValues.buttonNameItems.reduce<ByUuid>(
        (acc, field) => {
            if (field.metaField) {
                acc[field.metaField.uuid] = {
                    meta: field.metaField,
                    newMani: duplicateManiField(field.metaField.mani),
                };
            }
            return acc;
        }, {}
    );

    // 3. Merge

    const rv: ByUuid = {
        ...newRowFieldsByUuid,
        ...newSubmitsByUuid,
    };

    // const newFields = Object.entries(rv).sort(
    //     ([uuid1, field1], [uuid2, field2]) => field1.p)

    //     // ([uuid1, field1], [uuid2, field2]) => uuid1.localeCompare(uuid2))
    //     //.map(([_, field]) => field
    // );

}
