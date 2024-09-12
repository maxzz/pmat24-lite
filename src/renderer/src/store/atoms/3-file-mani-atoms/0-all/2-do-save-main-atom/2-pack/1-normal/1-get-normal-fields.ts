import { type Meta } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type NFormCtx } from "@/store/atoms/3-file-mani-atoms/9-types";
import { type NormalField, NormalFieldConv } from "../../../../1-normal-fields";
import { type NormalFieldsState } from "@/store/atoms/3-file-mani-atoms/1-normal-fields/0-all-normal-ctx/1-create-fields-context";

export type EditorFieldAndMeta = {
    editField: NormalField.ThisType;
    metaField: Meta.Field;
};

export function getNormalFieldValues(formCtx: NFormCtx, packParams: PackManifestDataParams): EditorFieldAndMeta[] {
    const { get, set } = packParams;

    const rv = formCtx.fieldsAtoms.map(
        (fieldAtoms: NormalFieldsState.Atoms) => {
            const metaField = fieldAtoms.metaField;

            const fromAtomValues: NormalField.ForAtoms = NormalFieldConv.fromAtoms(fieldAtoms, get, set);
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
