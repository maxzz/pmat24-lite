import { atom } from 'jotai';
import { proxy } from 'valtio';
import { catalogItemInFileToFieldValue, type CatalogItemEdit, type CatalogFile, uuid } from '@/store/manifest';
import { type Fce0Atoms, type Fce0Ctx, type FceItem } from '../9-types';
import { type FileContent } from '@shared/ipc-types';

export function fieldCatToFceAtoms(fileCnt: FileContent, fcat: CatalogFile.Root): Fce0Atoms {

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

    const rv: Fce0Atoms = {
        fileCnt: fileCnt,
        fceCtxAtom: atom<Fce0Ctx | null>(null),
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