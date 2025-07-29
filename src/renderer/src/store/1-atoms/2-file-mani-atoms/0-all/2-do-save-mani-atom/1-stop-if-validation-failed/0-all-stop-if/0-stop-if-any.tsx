import { type Getter, type Setter } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type AnyFormCtx, type ManiAtoms } from "../../../../9-types";
import { stopIfInvalidNormal } from "./1-stop-if-invalid-normal";
import { stopIfInvalidManual } from "./2-stop-if-invalid-manual";
import { stopIfInvalidOptions } from "./3-stop-if-invalid-options";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {

    if (stopIfInvalidOptions(maniAtoms, get, set)) {
        return true;
    }

    const [login, cpass] = maniAtoms;

    if (isInvalidForm(login, maniAtoms, FormIdx.login, get, set)) {
        return true;
    }

    if (isInvalidForm(cpass, maniAtoms, FormIdx.cpass, get, set)) {
        return true;
    }
}

function isInvalidForm(form: AnyFormCtx | undefined, maniAtoms: ManiAtoms, formIdx: FormIdx, get: Getter, set: Setter): boolean | undefined {
    if (form) {
        if (form.normal) {
            if (stopIfInvalidNormal(maniAtoms, get, set)) {
                return true;
            }
        }
        else if (form.manual) {
            if (stopIfInvalidManual(maniAtoms, get, set)) {
                return true;
            }
        }
    }
}
