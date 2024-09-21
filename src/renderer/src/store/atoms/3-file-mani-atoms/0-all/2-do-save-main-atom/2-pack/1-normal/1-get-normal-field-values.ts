import { type EditorField, type Meta } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type NormalField, NormalFieldConv, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";

export type EditorFieldAndMeta = {
    metaField: Meta.Field;
    editField: EditorField.Members;
};

export function getNormalFieldValues(formCtx: NFormCtx, packParams: PackManifestDataParams): EditorFieldAndMeta[] {
    const { get, set } = packParams;

    const rv = formCtx.rowsAtoms.map(
        (rowAtoms: NormalField.RowAtoms) => {
            const metaField = rowAtoms.metaField;

            const fromAtomValues: EditorField.ForAtoms = NormalFieldConv.fromAtoms(rowAtoms, get, set);
            const maniValues: EditorField.Members = NormalFieldConv.forMani(fromAtomValues);

            const rv: EditorFieldAndMeta = {
                metaField: metaField,
                editField: maniValues,
            };
            return rv;
        }
    );

    return rv;
}
