import { type PrimitiveAtom, type WritableAtom } from "jotai";
import { type CatalogFile, type Mani, type Meta } from "../manifest";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "@/store/atoms/3-file-mani-atoms";
import { type Fce0Atoms } from "../atoms/4-field-catalogs";

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

export type FileUsUiState = {
    isGroupAtom: PrimitiveAtom<boolean>;            // this fileUs selected for bulk group operation
    isCurrentAtom: PrimitiveAtom<boolean>;          // this fileUs is current and shown in the right panel
};

export type ParsedSrc = {
    mani: Mani.Manifest | undefined;                // for manifest raw json
    meta: Meta.Form[] | undefined;                  // for manifest file parsed content and meta forms
    fcat: CatalogFile.Root | undefined;             // for field catalog file parsed content
    stats: FileUsStats;                             // quick access statistics
};

export type FileUs = {
    fileCnt: FileContent;                           // file content
    parsedSrc: ParsedSrc;                           // parsed content from the file
    uiState: FileUsUiState;                         // local state atoms: is currnet; is selected

    maniAtomsAtom: PrimitiveAtom<ManiAtoms | null>; // mani editor ui atoms; created when file selected at top level
    fce0AtomsRef: Fce0Atoms | undefined | null;       // for manifest: reference to Fce atoms or null if from unmanaged folder (i.e. not root and not A/B/C subfolder)
    fce0Atoms: Fce0Atoms | undefined | null;          // for Fc file: Fce atoms or null for manifest files
};

export type FileUsAtom = WritableAtom<FileUs, [FileUs], void>;

export type FileUsAtomsAtom = PrimitiveAtom<ManiAtoms>; // already checked at top level if not null and ready to use
