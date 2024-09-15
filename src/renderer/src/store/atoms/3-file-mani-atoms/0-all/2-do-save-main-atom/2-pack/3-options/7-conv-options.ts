import { type FileMani } from "@/store/manifest";
import { type ManiOptions } from "../../../../4-options";
import { formDetectionForMani } from "./7-conv-form-detection";
import { formOptionsForMani } from "./7-conv-form-options";

export type DAOForMani = { // Detection And Options ForMani
    detection: FileMani.Detection;
    options: FileMani.Options;
};

export function formDAOForMani(options: ManiOptions.OptionsForAtoms): DAOForMani {
    const rv: DAOForMani = {
        detection: formDetectionForMani(options),
        options: formOptionsForMani(options),
    };
    return rv;
}
