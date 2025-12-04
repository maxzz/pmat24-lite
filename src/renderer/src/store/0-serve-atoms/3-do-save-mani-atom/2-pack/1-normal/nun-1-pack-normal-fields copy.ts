import { type FileMani } from "@/store/8-manifest";
import { type PackManifestDataParams } from "../9-types";
import { type EditorFieldAndMeta } from "./1-get-normal-field-values";
import { fieldForFileMani } from "./nun-7-conv-mani-field copy";

export function packNormalFields(editorFields: EditorFieldAndMeta[], packParams: PackManifestDataParams): FileMani.Field[] {

    // 2. Fields

    const fields: FileMani.Field[] = editorFields.map(
        (editorField: EditorFieldAndMeta) => {
            const metaField = editorField.metaField;

            const fileValues: FileMani.Field = fieldForFileMani({
                from: editorField.editField,
                maniField: metaField.mani,
                ftyp: metaField.ftyp,
                rdir: undefined,
                isSubmit: false,
            });

            return fileValues;
        }
    );

    return fields;
}
