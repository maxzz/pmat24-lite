import { type ManiAtoms } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { type FileUs, type FileUsAtom } from "@/store/store-types";

export type ResetManifestCtx = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    maniAtoms: ManiAtoms;
    get: Getter;
    set: Setter;
};
