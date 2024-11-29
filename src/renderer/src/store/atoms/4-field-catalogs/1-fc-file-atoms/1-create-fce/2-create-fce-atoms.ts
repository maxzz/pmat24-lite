import { atom } from "jotai";
import { proxy } from "valtio";
import { type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "../../../3-file-mani-atoms";
import { type FceItem, type FceAtoms, type FceItemEditor, defaultFcName, type FceItemValue } from "../../9-types";
import { type CatalogFile, uuid } from "@/store/manifest";
import { rootDir } from "../../../1-files/2-do-web-deliver/3-root-dir";
import { createParsedSrcForEmptyFce } from "../../../1-files/1-do-set-files/2-create-fileus";
import { finalizeFileContent } from "@/store/store-utils";
import { createFceCtx } from "./3-create-fce-ctx";
import { catalogItemInFileToFceItemValue } from "../../4-io";

export function createEmptyFceFileUs(): FileUs {
    const fileCnt: FileContent = finalizeFileContent(null);
    fileCnt.fpath = rootDir.rpath;
    fileCnt.fname = defaultFcName;

    const rv: FileUs = {
        fileCnt,
        parsedSrc: createParsedSrcForEmptyFce(fileCnt),
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),

        fceAtomsRef: undefined,
        fceAtoms: undefined,
    };

    rv.fceAtoms = createFceAtoms({ fileUs: rv, desc: undefined, items: undefined });
    return rv;
}

export function assignFceAtomsToFileUs(fileUs: FileUs) {
    const fcat = fileUs.parsedSrc.fcat;
    if (!fcat) {
        throw new Error('This is not a field catalog file');
    }

    const items: FceItem[] = finalizeFceItems(fcat.names);
    const rv: FceAtoms = createFceAtoms({ fileUs, desc: fcat.descriptor, items });

    fileUs.fceAtoms = rv;
}

function finalizeFceItems(items: CatalogFile.ItemInFile[]): FceItem[] {
    const rv: FceItem[] = items.map(
        (item, idx) => {
            const now = uuid.asRelativeNumber();
            const beforeEdit = catalogItemInFileToFceItemValue(item);
            const rv: FceItem = {
                fieldValue: proxy<FceItemValue>({ ...beforeEdit }),
                beforeEdit,
                fceMeta: { index: idx, uuid: now, mru: now, },
                editor: proxy<FceItemEditor>({ selectedView: false, selectedDlg: false, }),
            };
            return rv;
        }
    );
    return rv;
}

type CreateFceAtomsProps = {
    fileUs: FileUs;
    desc: CatalogFile.Descriptor | undefined;
    items: FceItem[] | undefined;
};

function createFceAtoms({ fileUs, desc, items }: CreateFceAtomsProps): FceAtoms {
    const rv: Omit<FceAtoms, 'viewFceCtx'> = {
        fileUs,
        descAtom: atom<string>(desc?.id || ''),
        allAtom: atom<FceItem[]>(items || []),
    };

    (rv as FceAtoms).viewFceCtx = createFceCtx({
        fceAtoms: rv as FceAtoms,
        inData: undefined,
        closeFldCatDialog: () => { },
    });

    return rv as FceAtoms;
}
