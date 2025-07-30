import { stringifyFromEditor, type FormIdx, type Mani, type EditorDataForOneAndSn, type EditorField, fieldTyp4Str, mergeSn } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { ManualFieldConv, NormalFieldConv, type MFormCnt } from "@/store/1-atoms/2-file-mani-atoms";
import { mergeToManiField } from "../1-normal";

export function packManualFields(mFormCnt: MFormCnt, formIdx: FormIdx, packParams: PackManifestDataParams): Mani.Field[] {
    const { getset } = packParams;

    const chunks = getset.get(mFormCnt.chunksAtom);
    const scriptItems = ManualFieldConv.fromAtoms(chunks, getset);

    const chunkAndSns: EditorDataForOneAndSn[] = stringifyFromEditor(scriptItems);

    const rv: Mani.Field[] = chunkAndSns.map(
        (chunkAndSn) => {
            const from: EditorField.Members = NormalFieldConv.forMani(chunkAndSn.chunk.editField);
            const ftyp = fieldTyp4Str(from);

            const newField: Mani.Field = mergeToManiField({
                from,
                maniField: chunkAndSn.chunk.field.mani,
                ftyp,
                isSubmit: false,
            });

            newField.path_ext = mergeSn(chunkAndSn.sn);

            return newField;
        }
    );

    return rv;
}
