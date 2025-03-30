import { stringifyFromEditor, type FormIdx, type Mani, type EditorDataForOneAndSn, type EditorField, fieldTyp4Str, mergeSn } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { ManualFieldConv, NormalFieldConv, type MFormCtx } from "@/store/1-atoms/3-file-mani-atoms";
import { mergeToManiField } from "../1-normal";

export function packManualFields(formCtx: MFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams): Mani.Field[] {
    const { get } = packParams;

    const chunks = get(formCtx.chunksAtom);
    const scriptItems = ManualFieldConv.fromAtoms(chunks, get);

    const chunkAndSns: EditorDataForOneAndSn[] = stringifyFromEditor(scriptItems);

    const rv: Mani.Field[] = chunkAndSns.map(
        (chunkAndsn) => {
            const from: EditorField.Members = NormalFieldConv.forMani(chunkAndsn.chunk.editField);
            const ftyp = fieldTyp4Str(from);

            const newField: Mani.Field = mergeToManiField({
                from,
                maniField: chunkAndsn.chunk.field.mani,
                ftyp,
                isSubmit: false,
            });

            newField.path = mergeSn(chunkAndsn.sn);

            return newField;
        }
    );

    return rv;
}
