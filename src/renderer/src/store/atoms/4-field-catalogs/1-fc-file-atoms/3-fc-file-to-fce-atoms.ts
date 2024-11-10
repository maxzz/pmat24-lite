import { atom } from 'jotai';
import { proxy } from 'valtio';
import { catalogItemInFileToFieldValue, type CatalogItemEdit, type CatalogFile, uuid } from '@/store/manifest';
import { type FceAtoms, type FceCtx, type FceItem } from '../9-types';
import { type FileContent } from '@shared/ipc-types';
import { type FileUs } from '@/store/store-types';
import { createFceAtoms } from './2-create-empty-fce-fileus';

export function fieldCatToFceAtoms(fileUs: FileUs): FceAtoms {

    const fcat = fileUs.parsedSrc.fcat;
    if (!fcat) {
        throw new Error('Field catalog not found');
    }

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

    const rv: FceAtoms = createFceAtoms({ fileUs, desc: fcat.descriptor, items });
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
