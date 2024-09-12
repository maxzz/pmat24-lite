import { type PackManifestDataParams } from "../9-types";
import { type NFormCtx } from "@/store/atoms/3-file-mani-atoms/9-types";
import { type NormalField, type NormalFieldsState, NormalFieldConv } from "../../../../1-normal-fields";

export function getNormalFieldValues(formCtx: NFormCtx, packParams: PackManifestDataParams): NormalField.ThisType[] {
    const { rvManifest, get, set } = packParams;

    // 2. Fields

    const rv = formCtx.fieldsAtoms.map(
        (fieldAtoms: NormalFieldsState.Atoms) => {
            const metaField = fieldAtoms.metaField;

            const fromAtomValues: NormalField.ForAtoms = NormalFieldConv.fromAtoms(fieldAtoms, get, set);
            const maniValues: NormalField.ThisType = NormalFieldConv.forMani(fromAtomValues);

            return maniValues;
        }
    );

    return rv;
}
