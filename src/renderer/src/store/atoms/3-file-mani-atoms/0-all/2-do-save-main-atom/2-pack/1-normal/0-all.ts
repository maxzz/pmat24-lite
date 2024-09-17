import { type Mani, FormIdx } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type EditorFieldAndMeta } from "./1-get-normal-field-values";
import { type SubmitConvTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { getNormalSubmitValues } from "./2-get-normal-submit-values";
import { getNormalFieldValues } from "./1-get-normal-field-values";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { mergeManiFields } from "./7-merge-mani-fields";

type ByUuid = {
    [uuid: string]: Mani.Field;
};


export function packNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams) {

    // 1. Fields

    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    const newRowFieldsByUuid: ByUuid = editAndMeta.reduce(
        (acc, editorField) => {
            const metaField = editorField.metaField;

            const newField: Mani.Field = mergeManiFields({
                from: editorField.editField,
                maniField: metaField.mani,
                ftyp: metaField.ftyp,
                rdir: undefined,
                isSubmit: false,
            });

            acc[metaField.uuid] = newField;
            return acc;
        }, {}
    );

    // const newRowFieldsByUuid: ByUuid[] = editAndMeta.map(
    //     (editorField: EditorFieldAndMeta) => {
    //         const metaField = editorField.metaField;

    //         const newField: Mani.Field = mergeManiFields({
    //             from: editorField.editField,
    //             maniField: metaField.mani,
    //             ftyp: metaField.ftyp,
    //             rdir: undefined,
    //             isSubmit: false,
    //         });

    //         return { [metaField.uuid]: newField };
    //     }
    // );

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

    const newSubmitsByUuid: ByUuid = submitsValues.buttonNameItems.reduce(
        (acc, field) => {
            if (field.metaField) {
                acc[field.metaField.uuid] = duplicateManiField(field.metaField.mani);
            }
            return acc;
        }, {}
    );

    // 3. Merge

    const rv: ByUuid = {
        ...newRowFieldsByUuid,
        ...newSubmitsByUuid,
    };

}
