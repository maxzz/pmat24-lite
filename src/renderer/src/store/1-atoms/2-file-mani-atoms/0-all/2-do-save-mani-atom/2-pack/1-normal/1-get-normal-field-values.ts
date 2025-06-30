import { type EditorField, type Meta } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type NFormCnt, type NormalField, NormalFieldConv } from "@/store/1-atoms/2-file-mani-atoms";

export type EditorFieldAndMeta = {
    metaField: Meta.Field;
    editField: EditorField.Members;
};

export function getNormalFieldValues(formCnt: NFormCnt, packParams: PackManifestDataParams): EditorFieldAndMeta[] {
    const { get, set } = packParams;

    const rv = formCnt.rowCtxs.map(
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
