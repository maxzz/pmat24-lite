import { PrimitiveAtom, WritableAtom } from "jotai";
import { CatalogFile, Mani, Meta } from "../manifest";

export type FileUsState = {
    isGroupAtom: PrimitiveAtom<boolean>;    // this fileUs selected for bulk group operation
    isCurrentAtom: PrimitiveAtom<boolean>;  // this fileUs is current and shown in the right panel
};

export type FileUsStats = {
    domain?: string;

    isWeb: boolean;
    isChrome: boolean;
    isFCat: boolean;
    isCustomization: boolean;

    url?: string;
    title?: string;
    
    isSubFolder?: boolean;      // Now it's a simple check to see if the path is in front of the filename.
    subFolder?: string;         // This is now the full path available from the browser, i.e. not a subfolder.
    
    dateCreated?: string;
    dateModified?: string;
};

export type FileUs = {
    id: string;
    idx: number;                // index in the loaded list wo/ counting on filters, i.e. absolute index

    fname: string;              // filename
    fpath: string;              // file relative path to the dropped folder
    fmodi: number;              // file.lastModified
    size: number;               // file size

    raw?: string;               // raw manifest as it was loaded
    mani?: Mani.Manifest;       // json raw manifest
    meta?: Meta.Form[];         // meta data on manifest

    fcat?: CatalogFile.Root;    // field catalog

    file?: File;                // file OS handle

    state: FileUsState;         // local state atoms: is currnet; is selected
    stats: FileUsStats;         // quick access statistics
};

export type FileUsAtomType = WritableAtom<FileUs, [FileUs], void>;
