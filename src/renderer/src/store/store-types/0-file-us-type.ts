import { type PrimitiveAtom } from "jotai";
import { type Mani, type Meta, type CatalogFile } from "../manifest";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "@/store/1-atoms/2-file-mani-atoms";
import { type FceAtoms } from "../1-atoms/4-field-catalogs";

export type FileUsStats = {
    loginFormDomain?: string;                       // fileUs.meta?.[0]?.disp.domain

    isFCat: boolean;                                // is file field catalog
    isFCatRoot: boolean;                            // is file root field catalog; setRootFcFileUs() sets it others files will have false
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

    fceAtomsForFcFile: FceAtoms | undefined;        // for Fc file: Fce atoms or null for manifest files
    fceAtomsRefForMani: FceAtoms | undefined;       // for manifest: reference to FceAtoms of the root FC or null if from unmanaged folder (i.e. not root and not A/B/C subfolder) (Maybe later: of correcponding FC if applicable for sub-folder (now only main))

    mainForCpassAtom: FileUsAtom | undefined;       // Defined when creating password change form
};

export type FileUsAtom = PrimitiveAtom<FileUs>;

//export type ManiAtomsAtom = PrimitiveAtom<ManiAtoms>; // already checked at top level if not null and ready to use
