import { type Getter, type Setter } from "jotai";
import { type ManiAtoms } from "../../9-types";
import { doVerifyOptionsAtom } from ".";
import { toast } from "sonner";
import { appSettings } from "@/store/app-settings";

export function stopIfNormalErrors(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    return;
}
