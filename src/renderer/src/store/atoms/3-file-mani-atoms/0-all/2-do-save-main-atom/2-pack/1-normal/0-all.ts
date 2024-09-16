import { type Mani, FormIdx } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type EditorFieldAndMeta } from "./2-get-normal-fields";
import { type SubmitConvTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { packNormalSubmit } from "./5-pack-normal-submit";
import { getNormalFieldValues } from "./2-get-normal-fields";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { mergeManiFields } from "./7-merge-mani-fields";

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams) {

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

    const isWeb = formCtx.submitAtoms.isWeb

    const submits: SubmitConvTypes.SubmitForAtoms = packNormalSubmit(formCtx, packParams);

    const selected = submits.selected;

    const newSubmitFields = submits.buttonNameItems.map(
        (submit) => {
            return {
                name: submit.name,
                field: submit.metaField?.mani && duplicateManiField(submit.metaField?.mani),
            };
        }
    );

}
