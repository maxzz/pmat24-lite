import { type ManiOptions, OptionsConv } from "../../../../4-options";
import { type PackManifestDataParams } from "../9-types";
import { type DAOForMani, detectionAndOptionsForMani } from "./7-conv-options";
import { filterEmptyValues } from "../../1-all-do-save-one-atom/1-pack-manifest/7-filter-empty-values";

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
