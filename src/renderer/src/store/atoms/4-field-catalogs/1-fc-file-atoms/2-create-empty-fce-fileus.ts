import { atom } from "jotai";
import { type FileUs, type FileUsStats } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "../../3-file-mani-atoms";
import { type FceItem, type FceAtoms, defaultFcName } from "../9-types";
import { finalizeFileContent } from "@/store/store-utils";
import { createFceCtx } from "./4-create-fce-ctx";
import { CatalogFile } from "pm-manifest";

export function createEmptyFceFileUs(): FileUs {
    const fileCnt: FileContent = finalizeFileContent(null);
    fileCnt.fname = defaultFcName;

    const rv: FileUs = {
        fileCnt,
        parsedSrc: {
            mani: undefined,
            meta: undefined,
            fcat: { names: [] },
            stats: { isFCat: true } as FileUsStats,
        },
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),

        fce0AtomsRef: undefined,
        fce0Atoms: undefined,

        fceAtomsRef: undefined,
        fceAtoms: undefined,
    };

    rv.fceAtoms = createFceAtoms({ fileUs: rv, desc: undefined, items: undefined });

    return rv;
}

export function createFceAtoms({ fileUs, desc, items }: { fileUs: FileUs; desc: CatalogFile.Descriptor | undefined; items: FceItem[] | undefined; }): FceAtoms {
    const rv: Omit<FceAtoms, 'viewFceCtx'> = {
        fileUs,
        descAtom: atom<string>(desc?.id || ''),
        itemsAtom: atom<FceItem[]>(items || []),
    };

    (rv as FceAtoms).viewFceCtx = createFceCtx({
        fceAtoms: rv as FceAtoms,
        inData: undefined,
        closeFldCatDialog: () => { },
    });

    return rv as FceAtoms;
}
