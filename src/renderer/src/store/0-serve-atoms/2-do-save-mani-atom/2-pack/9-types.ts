import { type Mani } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";

export type PackManifestDataParams = {
    fileUs: FileUs;
    maniAtoms: ManiAtoms;
    newMani: Partial<Mani.Manifest>; // New manifest being created
    getset: GetSet;
};
