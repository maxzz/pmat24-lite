import { type Atom, atom } from "jotai";
import { proxy } from "valtio";
import { type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "../../../3-file-mani-atoms";
import { type FceItem, type FceAtoms, type FceItemEditor, defaultFcName, type FceItemValue, type FceFilterOptions } from "../../9-types";
import { type CatalogFile, FieldTyp, uuid } from "@/store/manifest";
import { rootDir } from "../../../1-files/2-do-web-deliver/3-root-dir";
import { createParsedSrcForEmptyFce } from "../../../1-files/1-do-set-files/2-create-fileus";
import { finalizeFileContent } from "@/store/store-utils";
import { createFceCtx } from "./3-create-fce-ctx";
import { catalogItemInFileToFceItemValue } from "../../4-io";
import { createEmptyFceFilterOptions } from "../2-items";

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
                fceMeta: {
                    index: idx,
                    uuid: now,
                    mru: now,
                },
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
    const fceFilterOptions = proxy<FceFilterOptions>({ showText: true, showPassword: true, search: '', ascending: true });

    const rv: Omit<FceAtoms, 'viewFceCtx' | 'shownAtom'> = {
        fileUs,
        descAtom: atom<string>(desc?.id || ''),
        allAtom: atom<FceItem[]>(items || []),
    };

    (rv as FceAtoms).viewFceCtx = createFceCtx({
        fceAtoms: rv as FceAtoms,
        inData: undefined,
        closeFldCatDialog: () => { },
    });

    (rv as FceAtoms).shownAtom = createShownItemsAtom(rv as FceAtoms);

    return rv as FceAtoms;
}

const createShownItemsAtom = (fceAtoms: FceAtoms): Atom<FceItem[]> => {
    const items = atom<FceItem[]>(
        (get) => {
            const filterOptions = fceAtoms.viewFceCtx ? get(fceAtoms.viewFceCtx.filterAtom) : createEmptyFceFilterOptions();

            const rv = get(fceAtoms.allAtom).filter(
                (item) => {
                    const { showText, showPassword, search, ascending } = filterOptions;
                    console.log('filter', item);
                    return item;
                }
            );
            return rv;
        }
    );
    return items;
};

export function filterFceItems(items: FceItem[], filterOptions: FceFilterOptions): FceItem[] {
    const { showText, showPassword, search, ascending } = filterOptions;
    const filteredItems = items
        .filter(
            (item) => {
                const { fType, displayname, dbname, ownernote, value, isRef, isNon } = item.fieldValue;

                if (!showText && fType === FieldTyp.edit) {
                    return false;
                }

                if (!showPassword && fType === FieldTyp.psw) {
                    return false;
                }

                if (!search) {
                    return true;
                }

                const include = (
                    (showText && displayname.toLowerCase().includes(search.toLowerCase())) 
                    // || (showPassword && dbname.toLowerCase().includes(search.toLowerCase()))
                    // || (showText && ownernote.toLowerCase().includes(search.toLowerCase()))
                    // || (showPassword && value.toLowerCase().includes(search.toLowerCase()))
                    // || (showPassword && isRef.toString().toLowerCase().includes(search.toLowerCase()))
                    // ||(showPassword && isNon.toString().toLowerCase().includes(search.toLowerCase())
                );

                return include;
            }
        )
        .sort((a, b) => {
            if (ascending) {
                return a.fieldValue.displayname.localeCompare(b.fieldValue.displayname);
            } else {
                return b.fieldValue.displayname.localeCompare(a.fieldValue.displayname);
            }
        });
    return filteredItems;
} 
