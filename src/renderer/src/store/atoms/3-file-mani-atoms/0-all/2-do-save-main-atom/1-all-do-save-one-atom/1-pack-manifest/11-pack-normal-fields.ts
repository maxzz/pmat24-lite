import { type FileMani } from "@/store/manifest";
import { type PackManifestDataParams } from "./9-types";
import { type NFormCtx } from "@/store/atoms/3-file-mani-atoms/9-types";
import { ManiConv } from "../../0-conv/1-normal";
import { type NormalField, type NormalFieldsState, NormalFieldConv, SubmitConv } from "../../../../1-normal-fields";

export function packNormalFields(formCtx: NFormCtx, packParams: PackManifestDataParams) {
    const { rvManifest, get, set } = packParams;

    // 1. Submits

    const submits = SubmitConv.fromAtoms(formCtx.submitAtoms, get, set);
    console.log('submits', JSON.stringify(submits, null, 2));

    // 2. Fields

    const fields = formCtx.fieldsAtoms.map(
        (fieldAtoms: NormalFieldsState.Atoms) => {
            const metaField = fieldAtoms.metaField;

            const fromAtomValues: NormalField.ForAtoms = NormalFieldConv.fromAtoms(fieldAtoms, get, set);
            const maniValues: NormalField.ThisType = NormalFieldConv.forMani(fromAtomValues);
            const fileValues: FileMani.Field = ManiConv.fieldForFileMani({
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
