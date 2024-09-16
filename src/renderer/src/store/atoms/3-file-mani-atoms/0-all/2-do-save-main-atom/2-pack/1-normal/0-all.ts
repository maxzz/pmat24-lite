import { type Mani, FormIdx } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type EditorFieldAndMeta } from "./1-get-normal-field-values";
import { type SubmitConvTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { getNormalSubmitValues } from "./2-get-normal-submit-values";
import { getNormalFieldValues } from "./1-get-normal-field-values";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { mergeManiFields } from "./7-merge-mani-fields";

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams) {

    // 1. Fields

    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    const newRowFields: Mani.Field[] = editAndMeta.map(
        (editorField: EditorFieldAndMeta) => {
            const metaField = editorField.metaField;

            const newField: Mani.Field = mergeManiFields({
                from: editorField.editField,
                maniField: metaField.mani,
                ftyp: metaField.ftyp,
                rdir: undefined,
                isSubmit: false,
            });

            return newField;
        }
    );

    // 2. Submits

    const submits: SubmitConvTypes.SubmitForAtoms = getNormalSubmitValues(formCtx, packParams);

    const selected = submits.selected;

    const isWeb = formCtx.submitAtoms.isWeb;
    if (isWeb) {

    } else {
    }

    const newSubmitFields = submits.buttonNameItems.map(
        (submit) => {
            return {
                name: submit.name,
                field: submit.metaField?.mani && duplicateManiField(submit.metaField?.mani),
            };
        }
    );

}
