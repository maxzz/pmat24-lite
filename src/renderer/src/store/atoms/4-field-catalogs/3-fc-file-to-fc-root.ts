import { proxy } from 'valtio';
import { catalogItemInFileToFieldValue, type CatalogItemEdit, type CatalogFile } from '@/store/manifest';
import { type FceItem, type FceRoot } from './9-types';
import { uuid } from '@/utils';

export function fieldCatToFceRoot(fcat: CatalogFile.Root): FceRoot {
    const rv: FceRoot = {
        descriptor: fcat.descriptor,
        items: fcat.names.map(
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
        ),
    };
    return rv;
}
