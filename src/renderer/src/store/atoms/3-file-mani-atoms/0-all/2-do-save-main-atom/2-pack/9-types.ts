import { type ManiAtoms } from "@/store/atoms/3-file-mani-atoms/9-types";
import { type Mani } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type Getter, type Setter } from "jotai";

export type PackManifestDataParams = {
    fileUs: FileUs;
    maniAtoms: ManiAtoms;
    newMani: Partial<Mani.Manifest>; // New manifest being created
    get: Getter;
    set: Setter;
};
