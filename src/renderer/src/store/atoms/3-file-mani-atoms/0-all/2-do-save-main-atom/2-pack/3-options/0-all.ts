import { type ManiOptions, OptionsConv } from "../../../../4-options";
import { type PackManifestDataParams } from "../9-types";
import { formDetectionForMani } from "./7-conv-form-detection";
import { formOptionsForMani } from "./7-conv-form-options";

export function packFormOptions(optionsAtoms: ManiOptions.FormOptionsAtoms, packParams: PackManifestDataParams) {
    const { get, set } = packParams;

    const detectionAndOptionsRow = OptionsConv.fromAtoms(optionsAtoms, get, set);

    const rv = {
        detection: formDetectionForMani(detectionAndOptionsRow),
        options: formOptionsForMani(detectionAndOptionsRow),
    };
    // console.log('options', JSON.stringify(rv, null, 2).replace(/"names_ext":\s".*",/, '"names_ext": "...",'));

    return rv;
}
