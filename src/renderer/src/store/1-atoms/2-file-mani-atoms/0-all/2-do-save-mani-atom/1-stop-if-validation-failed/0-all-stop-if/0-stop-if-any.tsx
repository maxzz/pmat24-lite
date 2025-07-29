import { type Getter, type Setter } from "jotai";
import { type ManiAtoms } from "../../../../9-types";
import { stopIfInvalidNormal } from "./1-stop-if-invalid-normal";
import { stopIfInvalidManual } from "./2-stop-if-invalid-manual";
import { stopIfInvalidOptions } from "./3-stop-if-invalid-options";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    // Options

    if (stopIfInvalidOptions(maniAtoms, get, set)) {
        return true;
    }

    // Normal mode

    const [login, cpass] = maniAtoms;

    if (login?.normal) {
        if (stopIfInvalidNormal(maniAtoms, get, set)) {
            return true;
        }
    }

    if (cpass?.normal) {
        if (stopIfInvalidNormal(maniAtoms, get, set)) {
            return true;
        }
    }

    // Manual mode

    if (login?.manual) {
        if (stopIfInvalidManual(maniAtoms, get, set)) {
            return true;
        }
    }

    if (cpass?.manual) {
        if (stopIfInvalidManual(maniAtoms, get, set)) {
            return true;
        }
    }
}
