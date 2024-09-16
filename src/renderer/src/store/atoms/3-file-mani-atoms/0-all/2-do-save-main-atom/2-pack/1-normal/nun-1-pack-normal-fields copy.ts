import { type FileMani } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type EditorFieldAndMeta } from "./2-get-normal-fields";
import { fieldForFileMani } from "./nun-7-conv-mani-field copy";

export function packNormalFields(editorFields: EditorFieldAndMeta[], packParams: PackManifestDataParams): FileMani.Field[] {
    const { newMani, get, set } = packParams;

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
