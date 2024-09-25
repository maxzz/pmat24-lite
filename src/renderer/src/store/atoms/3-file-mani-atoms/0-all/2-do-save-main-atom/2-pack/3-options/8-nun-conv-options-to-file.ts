import { type FileMani } from "@/store/manifest";
import { type ManiOptions } from "../../../../4-options";
import { formDetectionForMani } from "./8-nun-conv-form-detection-to-file";
import { formOptionsForMani } from "./8-nun-conv-form-options-to-file";

export type DAOForMani = { // Detection And Options ForMani
    detection: FileMani.Detection;
    options: FileMani.Options;
};

export function formDAOForMani(options: ManiOptions.ForAtoms): DAOForMani {
    const rv: DAOForMani = {
        detection: formDetectionForMani(options),
        options: formOptionsForMani(options),
    };
    return rv;
}
