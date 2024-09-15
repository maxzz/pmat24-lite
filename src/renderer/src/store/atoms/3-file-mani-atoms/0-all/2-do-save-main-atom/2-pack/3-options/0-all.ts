import { type ManiOptions, OptionsConv } from "../../../../4-options";
import { type PackManifestDataParams } from "../9-types";
import { type DAOForMani } from "./8-conv-options-to-file";
import { filterEmptyValues } from "../../0-save-atom/7-filter-empty-values";
import { formDetectionForMani } from "./7-conv-form-detection";
import { formOptionsForMani } from "./7-conv-form-options";
import { FormIdx } from "@/store/store-types";

export function packFormOptions(optionsAtoms: ManiOptions.FormOptionsAtoms, formIdx: FormIdx, packParams: PackManifestDataParams) {
    const { newMani, get, set } = packParams;

    const detectionAndOptionsRow = OptionsConv.fromAtoms(optionsAtoms, get, set);

    if (!newMani.forms) {
        return;
    }

    newMani.forms[formIdx] = {
        detection: formDetectionForMani(detectionAndOptionsRow),
        options: formOptionsForMani(detectionAndOptionsRow),
        fields: [],
    };

    // const optionStr = JSON
    //     .stringify(detectionAndOptions, null, 2)
    //     .replace(/"names_ext":\s".*",/, '"names_ext": "...",');
    // console.log('options', optionStr);
}
