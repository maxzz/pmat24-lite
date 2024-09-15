import { type ManiOptions, OptionsConv } from "../../../../4-options";
import { type PackManifestDataParams } from "../9-types";
import { type DAOForMani, formDAOForMani } from "./8-nun-conv-options-to-file";
import { filterEmptyValues } from "../../0-save-atom/7-filter-empty-values";

export function packFormOptions(optionsP: ManiOptions.FormOptionsAtoms, packParams: PackManifestDataParams) {
    const { newMani, get, set } = packParams;

    const detectionAndOptionsRow = OptionsConv.fromAtoms(optionsP, get, set);

    const { detection, options } = formDAOForMani(detectionAndOptionsRow);

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
