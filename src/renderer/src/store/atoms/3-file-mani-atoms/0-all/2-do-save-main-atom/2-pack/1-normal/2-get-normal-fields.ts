import { type EditorField, type Meta } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type NormalField, NormalFieldConv, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";

export type EditorFieldAndMeta = {
    editField: NormalField.ThisType;
    metaField: Meta.Field;
};

export function getNormalFieldValues(formCtx: NFormCtx, packParams: PackManifestDataParams): EditorFieldAndMeta[] {
    const { get, set } = packParams;

    const rv = formCtx.rowsAtoms.map(
        (rowAtoms: NormalField.RowAtoms) => {
            const metaField = rowAtoms.metaField;

            const fromAtomValues: EditorField.ForAtoms = NormalFieldConv.fromAtoms(rowAtoms, get, set);
            const maniValues: NormalField.ThisType = NormalFieldConv.forMani(fromAtomValues);

            const rv: EditorFieldAndMeta = {
                editField: maniValues,
                metaField: metaField,
            };
            return rv;
        }
    );

    return rv;
}
