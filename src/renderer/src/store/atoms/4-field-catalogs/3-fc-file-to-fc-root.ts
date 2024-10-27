import { atom } from 'jotai';
import { proxy } from 'valtio';
import { catalogItemInFileToFieldValue, type CatalogItemEdit, type CatalogFile } from '@/store/manifest';
import { type FceItem, type FceRoot } from './9-types';
import { uuid } from '@/utils';
import { type FileContent } from '@shared/ipc-types';

export function fieldCatToFceRoot(fileCnt: FileContent, fcat: CatalogFile.Root): FceRoot {
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
    const rv: FceRoot = {
        fileCnt: fileCnt,
        descriptor: fcat.descriptor,
        items: atom<FceItem[]>(items),
    };
    return rv;
}
