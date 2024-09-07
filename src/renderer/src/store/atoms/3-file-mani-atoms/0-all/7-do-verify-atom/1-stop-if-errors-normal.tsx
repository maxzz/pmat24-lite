import { type Getter, type Setter } from "jotai";
import { type ManiAtoms } from "../../9-types";

export function stopIfNormalErrors(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    return;
}
