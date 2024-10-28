import { atom } from 'jotai';
import { proxy } from 'valtio';
import { catalogItemInFileToFieldValue, type CatalogItemEdit, type CatalogFile } from '@/store/manifest';
import { type FceItem, type FceRoot } from './9-types-fc';
import { uuid } from '@/utils';
import { type FileContent } from '@shared/ipc-types';
import { type FceCtx } from './2-dialog-atoms';

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
        fceAtomsAtom: atom<FceCtx | null>(null),
        descriptor: fcat.descriptor,
        items: atom<FceItem[]>(items),
    };
    return rv;
}
