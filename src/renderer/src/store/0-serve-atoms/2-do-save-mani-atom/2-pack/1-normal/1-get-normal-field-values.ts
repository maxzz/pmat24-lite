import { type EditorField, type Meta } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type NFormCnt, type FieldRowCtx, NormalFieldConv } from "@/store/1-file-mani-atoms";

export type EditorFieldAndMeta = {
    metaField: Meta.Field;
    editField: EditorField.Members;
};

export function getNormalFieldValues(nFormCnt: NFormCnt, { getset }: PackManifestDataParams): EditorFieldAndMeta[] {

    const rv = nFormCnt.rowCtxs.map(
        (rowCtx: FieldRowCtx) => {
            const fromAtomValues: EditorField.ForAtoms = NormalFieldConv.fromAtoms(rowCtx, getset);
            const maniValues: EditorField.Members = NormalFieldConv.forMani(fromAtomValues);

            const rv: EditorFieldAndMeta = {
                metaField: rowCtx.metaField,
                editField: maniValues,
            };
            return rv;
        }
    );

    return rv;
}
