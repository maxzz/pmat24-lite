import { type EditorField, type Meta } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type NormalField, NormalFieldConv, type NFormCtx } from "@/store/1-atoms/3-file-mani-atoms";

export type EditorFieldAndMeta = {
    metaField: Meta.Field;
    editField: EditorField.Members;
};

export function getNormalFieldValues(formCtx: NFormCtx, packParams: PackManifestDataParams): EditorFieldAndMeta[] {
    const { get, set } = packParams;

    const rv = formCtx.rowCtxs.map(
        (rowCtx: NormalField.RowCtx) => {
            const fromAtomValues: EditorField.ForAtoms = NormalFieldConv.fromAtoms(rowCtx, get, set);
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
