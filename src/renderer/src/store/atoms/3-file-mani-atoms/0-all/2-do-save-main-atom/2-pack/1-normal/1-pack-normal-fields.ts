import { type FileMani } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type NFormCtx } from "@/store/atoms/3-file-mani-atoms/9-types";
import { type NormalField, type NormalFieldsState, NormalFieldConv } from "../../../../1-normal-fields";
import { fieldForFileMani } from "./7-conv-mani-field";

export function packNormalFields(formCtx: NFormCtx, packParams: PackManifestDataParams) {
    const { rvManifest, get, set } = packParams;

    // 2. Fields

    const fields = formCtx.fieldsAtoms.map(
        (fieldAtoms: NormalFieldsState.Atoms) => {
            const metaField = fieldAtoms.metaField;

            const fromAtomValues: NormalField.ForAtoms = NormalFieldConv.fromAtoms(fieldAtoms, get, set);
            const maniValues: NormalField.ThisType = NormalFieldConv.forMani(fromAtomValues);
            const fileValues: FileMani.Field = fieldForFileMani({
                from: maniValues,
                maniField: metaField.mani,
                ftyp: metaField.ftyp,
                rdir: undefined,
                isSubmit: false,
            });
            return fileValues;
        }
    );
    // console.log('maniValues', JSON.stringify(fields, null, 2));
}
