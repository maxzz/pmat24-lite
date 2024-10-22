import { type PrimitiveAtom, type WritableAtom } from "jotai";
import { type CatalogFile, type Mani, type Meta } from "../manifest";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "@/store/atoms/3-file-mani-atoms";
import { type FceRoot } from "../atoms/4-field-catalogs";

export type FileUsStats = {
    loginFormDomain?: string;                       // fileUs.meta?.[0]?.disp.domain

    isLoginFormWeb: boolean;                        // is login web form; ourl maybe changed but should not become empty
    isLoginFormChrome: boolean;                     // is web apploication and not IE; isWeb && !fileUs.meta?.[0]?.disp.isIe
    isFCat: boolean;                                // is file field catalog
    isCustomization: boolean;                       // is file customization; !fileUs.meta?.length && !!fileUs.mani?.options

    loginFormChooseNameAtom: PrimitiveAtom<string>; // loginForm?.options.choosename

    isSubFolder?: boolean;                          //TODO: This is not really needed // Now it's a simple check to see if the path is in front of the filename.
    subFolder?: string;                             //TODO: This is not really needed // This is now the full path available from the browser, i.e. not a subfolder.

    dateCreated?: string;                           // TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.created)
    dateModified?: string;                          // TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.modified)
};

export type FileUsState = {
    isGroupAtom: PrimitiveAtom<boolean>;            // this fileUs selected for bulk group operation
    isCurrentAtom: PrimitiveAtom<boolean>;          // this fileUs is current and shown in the right panel
};

export type ParsedSrc = {
    mani: Mani.Manifest | undefined;                // for manifest raw json
    meta: Meta.Form[] | undefined;                  // for manifest file parsed content and meta forms
    fcat: CatalogFile.Root | undefined;             // for field catalog file parsed content
};

export type FileUs = FileContent & {
    parsedSrc: ParsedSrc;                           // parsed content from the file

    stats: FileUsStats;                             // quick access statistics
    state: FileUsState;                             // local state atoms: is currnet; is selected

    fcer?: FceRoot;                                 // reference to field catalog editor items from the fce roots storage for this file folder

    maniAtomsAtom: PrimitiveAtom<ManiAtoms | null>; // mani editor ui atoms; created when file selected at top level
};

export type FileUsAtom = WritableAtom<FileUs, [FileUs], void>;

export type FileUsAtomsAtom = PrimitiveAtom<ManiAtoms>; // already checked at top level if not null and ready to use
