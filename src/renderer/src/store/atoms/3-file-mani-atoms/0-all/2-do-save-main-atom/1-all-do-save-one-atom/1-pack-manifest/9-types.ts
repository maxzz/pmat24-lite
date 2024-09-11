import { type ManiAtoms } from "@/store/atoms/3-file-mani-atoms/9-types";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type Getter, type Setter } from "jotai";

export type PackManifestDataParams = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    maniAtoms: ManiAtoms;
    newFilename?: string;
    get: Getter;
    set: Setter;
};
