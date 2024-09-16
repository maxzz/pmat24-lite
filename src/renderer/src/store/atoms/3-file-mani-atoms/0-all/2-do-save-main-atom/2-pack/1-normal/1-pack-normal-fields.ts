import { Mani } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type EditorFieldAndMeta } from "./2-get-normal-fields";
import { fieldForFileMani } from "./7-conv-mani-field";

export function packNormalFields(editorFields: EditorFieldAndMeta[], packParams: PackManifestDataParams): Mani.Field[] {
    const { newMani, get, set } = packParams;

    // 2. Fields

    const fields: Mani.Field[] = editorFields.map(
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

    return fields;
}
