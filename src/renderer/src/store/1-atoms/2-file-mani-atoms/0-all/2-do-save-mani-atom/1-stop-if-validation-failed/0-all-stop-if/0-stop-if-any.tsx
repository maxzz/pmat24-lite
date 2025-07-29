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

    const [login, cpass] = maniAtoms;

    if (login) {
        if (login.normal) {
            if (stopIfInvalidNormal(maniAtoms, get, set)) {
                return true;
            }
        }
        else if (login.manual) {
            if (stopIfInvalidManual(maniAtoms, get, set)) {
                return true;
            }
        }
    }

    if (cpass) {
        if (cpass.normal) {
            if (stopIfInvalidNormal(maniAtoms, get, set)) {
                return true;
            }
        }
        else if (cpass.manual) {
            console.log('cpass.manual');
            if (stopIfInvalidManual(maniAtoms, get, set)) {
                return true;
            }
        }
    }
}
