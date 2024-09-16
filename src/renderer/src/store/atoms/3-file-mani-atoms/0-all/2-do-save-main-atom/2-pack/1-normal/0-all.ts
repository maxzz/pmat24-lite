import { type Mani } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type EditorFieldAndMeta } from "./2-get-normal-fields";
import { type SubmitConvTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { packNormalSubmit } from "./5-pack-normal-submit";
import { getNormalFieldValues } from "./2-get-normal-fields";
import { duplicateManiField } from "./7-duplicate-mani-field";
import { fieldForFileMani } from "./7-conv-mani-field";

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, packParams: PackManifestDataParams) {

    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    const fields: Mani.Field[] = editAndMeta.map(
        (editorField: EditorFieldAndMeta) => {
            const metaField = editorField.metaField;

            const fileValues: Mani.Field = fieldForFileMani({
                from: editorField.editField,
                maniField: metaField.mani,
                ftyp: metaField.ftyp,
                rdir: undefined,
                isSubmit: false,
            });

            return fileValues;
        }
    );

    //packNormalFields(editAndMeta, packParams); // This should be before packNormalSubmit
    
    const submits: SubmitConvTypes.SubmitForAtoms = packNormalSubmit(formCtx, packParams); // Options should called before submit or set form submit here

    const selected = submits.selected;

    const updatedSubmitFields = submits.buttonNameItems.map((submit) => {
        return {
            name: submit.name,
            field: submit.metaField?.mani && duplicateManiField(submit.metaField?.mani),
        };
    });

}
