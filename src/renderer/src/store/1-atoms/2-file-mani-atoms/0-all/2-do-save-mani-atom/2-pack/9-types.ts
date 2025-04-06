import { type Getter, type Setter } from "jotai";
import { type Mani } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type ManiAtoms } from "@/store/1-atoms/2-file-mani-atoms/9-types";

export type PackManifestDataParams = {
    fileUs: FileUs;
    maniAtoms: ManiAtoms;
    newMani: Partial<Mani.Manifest>; // New manifest being created
    get: Getter;
    set: Setter;
};
