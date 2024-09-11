import { type Getter, type Setter } from "jotai";
import { type ManiAtoms } from "../../../9-types";
import { stopIfNormalErrors } from "./1-stop-if-errors-normal";
import { stopIfManualErrors } from "./2-stop-if-errors-manual";
import { stopIfOptionErrors } from "./3-stop-if-errors-options";

export function stopIfAnyErrors(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    // Options

    if (stopIfOptionErrors(maniAtoms, get, set)) {
        return true;
    }

    // Normal mode

    const [login, cpass] = maniAtoms;

    if (login?.normal) {
        if (stopIfNormalErrors(maniAtoms, get, set)) {
            return true;
        }
    }

    if (cpass?.normal) {
        if (stopIfNormalErrors(maniAtoms, get, set)) {
            return true;
        }
    }

    // Manual mode

    if (login?.manual) {
        if (stopIfManualErrors(maniAtoms, get, set)) {
            return true;
        }
    }

    if (cpass?.manual) {
        if (stopIfManualErrors(maniAtoms, get, set)) {
            return true;
        }
    }
}
