import { atom } from 'jotai';
import { proxy } from 'valtio';
import { catalogItemInFileToFieldValue, type CatalogItemEdit, type CatalogFile, uuid } from '@/store/manifest';
import { type FceItem, type FceRoot } from '../9-types-fc';
import { type FileContent } from '@shared/ipc-types';
import { type FceCtx } from '../2-fc-dialog-atoms';
import { finalizeFileContent } from '@/store';

export function fieldCatToFceRoot(fileCnt: FileContent, fcat: CatalogFile.Root): FceRoot {

    // 1. Prepare items for the field catalog editor

    const items: FceItem[] = fcat.names.map(
        (item, idx) => {
            const now = uuid.asRelativeNumber();
            const rv: FceItem = {
                ...catalogItemInFileToFieldValue(item),
                index: idx,
                uuid: now,
                mru: now,
                editor: proxy<CatalogItemEdit['editor']>({
                    selected: false,
                }),
            };
            return rv;
        }
    );

    // 2. Finalize the field catalog editor root

    const rv: FceRoot = {
        fileCnt: fileCnt,
        fceAtomsAtom: atom<FceCtx | null>(null),
        descriptor: fcat.descriptor,
        items: atom<FceItem[]>(items),
    };

    return rv;
}

export function addReactiveState(items: FceItem[]): FceItem[] {
    return items.map(
        (item) => {
            const rv: FceItem = {
                ...item,
                editor: proxy<CatalogItemEdit['editor']>({
                    selected: false,
                }),
            };
            return rv;
        }
    );
}

export function createEmptyFceRoot(fileCnt: FileContent | null | undefined): FceRoot {
    const rv: FceRoot = {
        fileCnt: fileCnt || finalizeFileContent(null),
        fceAtomsAtom: atom<FceCtx | null>(null),
        descriptor: {},
        items: atom<FceItem[]>([]),
    };
    return rv;
}
