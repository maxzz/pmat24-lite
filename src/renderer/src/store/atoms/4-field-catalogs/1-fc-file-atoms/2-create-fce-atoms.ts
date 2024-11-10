import { atom } from "jotai";
import { proxy } from "valtio";
import { type FileUs, type FileUsStats } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "../../3-file-mani-atoms";
import { type FceItem, type FceAtoms, defaultFcName } from "../9-types";
import { CatalogFile, type CatalogItemEdit, catalogItemInFileToFieldValue, uuid } from "@/store/manifest";
import { finalizeFileContent } from "@/store/store-utils";
import { createFceCtx } from "./4-create-fce-ctx";

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

export function createFromFileUsFceAtoms(fileUs: FileUs): FceAtoms {
    const fcat = fileUs.parsedSrc.fcat;
    if (!fcat) {
        throw new Error('This is not a field catalog file');
    }

    const items: FceItem[] = finalizeFceItems(fcat.names);

    const rv: FceAtoms = createFceAtoms({ fileUs, desc: fcat.descriptor, items });
    return rv;
}

function finalizeFceItems(items: CatalogFile.ItemInFile[]): FceItem[] {
    const rv: FceItem[] = items.map(
        (item, idx) => {
            const now = uuid.asRelativeNumber();
            const rv: FceItem = {
                ...catalogItemInFileToFieldValue(item),
                index: idx,
                uuid: now,
                mru: now,
                editor: proxy<CatalogItemEdit['editor']>({ selected: false, }),
            };
            return rv;
        }
    );
    return rv;
}

function createFceAtoms({ fileUs, desc, items }: { fileUs: FileUs; desc: CatalogFile.Descriptor | undefined; items: FceItem[] | undefined; }): FceAtoms {
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
