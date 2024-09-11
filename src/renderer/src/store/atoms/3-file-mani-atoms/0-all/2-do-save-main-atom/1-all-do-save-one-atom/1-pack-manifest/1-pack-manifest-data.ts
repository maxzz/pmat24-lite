import { type FileMani } from "@/store/manifest";
import { type NormalField, type NormalFieldsState, NormalFieldConv, SubmitConv } from "../../../../1-normal-fields";
import { ManiConv } from "../../0-conv/1-normal/2-conv-mani";
import { ManiOptions, OptionsConv } from "../../../../4-options";
import { type DAOForMani, detectionAndOptionsForMani } from "../../0-conv/3-options/53-conv-mani-options";
import { filterEmptyValues } from "./7-filter-empty-values";
import { PackManifestDataParams } from "./9-types";
import { NFormCtx } from "@/store/atoms/3-file-mani-atoms/9-types";

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

export function packOptions(optionsP: ManiOptions.FormOptionsAtoms, packParams: PackManifestDataParams) {
    const { rvManifest, get, set } = packParams;

    const detectionAndOptionsRow = OptionsConv.fromAtoms(optionsP, get, set);

    const { detection, options } = detectionAndOptionsForMani(detectionAndOptionsRow);

    const detectionFiltered = filterEmptyValues(detection);
    const optionsFiltered = filterEmptyValues(options);

    const detectionAndOptions: Partial<DAOForMani> = {
        ...(detectionFiltered && { detection: detectionFiltered }),
        ...(optionsFiltered && { options: optionsFiltered }),
    };

    const optionStr = JSON
        .stringify(detectionAndOptions, null, 2)
        .replace(/"names_ext":\s".*",/, '"names_ext": "...",');
    console.log('options', optionStr);
}

export function packManifestData(packParams: PackManifestDataParams) {
    const { maniAtoms } = packParams;

    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    if (loginFormAtoms) {
        if (loginFormAtoms.normal) {
            packNormalFields(loginFormAtoms.normal, packParams);
        }
        packOptions(loginFormAtoms.options, packParams);
    }

    if (cpassFormAtoms) {
        if (cpassFormAtoms.normal) {
            packNormalFields(cpassFormAtoms.normal, packParams);
        }
        packOptions(cpassFormAtoms.options, packParams);
    }

    // 4. The rest
}
