import { PrimitiveAtom, WritableAtom } from "jotai";
import { CatalogFile, Mani, Meta } from "../manifest";
import { FileContent } from "@shared/ipc-types";
import { ChangesSet, ManiAtoms } from "../atoms/3-file-mani-atoms/9-types";

export type FileUsState = {
    isGroupAtom: PrimitiveAtom<boolean>;    // this fileUs selected for bulk group operation
    isCurrentAtom: PrimitiveAtom<boolean>;  // this fileUs is current and shown in the right panel
};

export type FileUsStats = {
    domain?: string;                        // fileUs.meta?.[0]?.disp.domain

    isWeb: boolean;                         // is web apploication
    isChrome: boolean;                      // is web apploication and not IE; isWeb && !fileUs.meta?.[0]?.disp.isIe
    isFCat: boolean;                        // is field catalog
    isCustomization: boolean;               // !fileUs.meta?.length && !!fileUs.mani?.options

    url?: string;                           // loginForm?.detection.web_ourl
    title?: string;                         // loginForm?.options.choosename

    isSubFolder?: boolean;                  // Now it's a simple check to see if the path is in front of the filename.
    subFolder?: string;                     // This is now the full path available from the browser, i.e. not a subfolder.

    dateCreated?: string;                   // TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.created)
    dateModified?: string;                  // TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.modified)
};

export type FileUs = FileContent & {
    mani?: Mani.Manifest;                   // json raw manifest
    meta?: Meta.Form[];                     // meta data on manifest
    fcat?: CatalogFile.Root;                // field catalog

    state: FileUsState;                     // local state atoms: is currnet; is selected
    stats: FileUsStats;                     // quick access statistics

    atomsAtom: PrimitiveAtom<ManiAtoms | null>; // mani editor ui atoms; created when file selected at top level
    changesSet: ChangesSet;                 // mani editor changes set; created when file selected at top level
};

export type FileUsAtom = WritableAtom<FileUs, [FileUs], void>;

export type FileUsAtomsAtom = PrimitiveAtom<ManiAtoms>; // already checked at top level if not null and ready to use
