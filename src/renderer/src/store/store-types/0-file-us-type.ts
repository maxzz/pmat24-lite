import { type PrimitiveAtom, type WritableAtom } from "jotai";
import { type CatalogFile, type Mani, type Meta } from "../manifest";
import { type FileContent } from "@shared/ipc-types";
import { type ChangesSet, type ManiAtoms } from "@/store/atoms/3-file-mani-atoms";

export type FileUsState = {
    isGroupAtom: PrimitiveAtom<boolean>;            // this fileUs selected for bulk group operation
    isCurrentAtom: PrimitiveAtom<boolean>;          // this fileUs is current and shown in the right panel
};

export type FileUsStats = {
    loginFormDomain?: string;                       // fileUs.meta?.[0]?.disp.domain

    isLoginFormWeb: boolean;                        // is login web form; ourl maybe changed but should not become empty
    isLoginFormChrome: boolean;                     // is web apploication and not IE; isWeb && !fileUs.meta?.[0]?.disp.isIe
    isFCat: boolean;                                // is file field catalog
    isCustomization: boolean;                       // is file customization; !fileUs.meta?.length && !!fileUs.mani?.options

    loginFormChooseNameAtom: PrimitiveAtom<string>; // loginForm?.options.choosename

    isSubFolder?: boolean;                          // Now it's a simple check to see if the path is in front of the filename.
    subFolder?: string;                             // This is now the full path available from the browser, i.e. not a subfolder.

    dateCreated?: string;                           // TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.created)
    dateModified?: string;                          // TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.modified)
};

export type FileUs = FileContent & {
    mani?: Mani.Manifest;                           // json raw manifest
    meta?: Meta.Form[];                             // meta data on manifest
    fcat?: CatalogFile.Root;                        // field catalog

    state: FileUsState;                             // local state atoms: is currnet; is selected
    stats: FileUsStats;                             // quick access statistics

    maniAtomsAtom: PrimitiveAtom<ManiAtoms | null>; // mani editor ui atoms; created when file selected at top level
    changesSet: ChangesSet;                         // mani editor changes set; created when file selected at top level
};

export type FileUsAtom = WritableAtom<FileUs, [FileUs], void>;

export type FileUsAtomsAtom = PrimitiveAtom<ManiAtoms>; // already checked at top level if not null and ready to use
