import { atom } from "jotai";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { LaunchDataAll } from "./9-launch-types";
import { getLaunchData } from "./1-get-launch-data";

export const launchDataAtom = atom(
    null,
    (get, set, maniAtoms: ManiAtoms): LaunchDataAll => getLaunchData(maniAtoms, get)
);
