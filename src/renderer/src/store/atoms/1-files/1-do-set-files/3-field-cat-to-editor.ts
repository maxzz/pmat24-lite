import { catalogItemInFileToFieldValue, type CatalogFile } from '@/store/manifest';
import { type FceItem, type FceRoot } from '../../4-field-catalogs';
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
                    selected: false,
                };
                return rv;
            }
        ),
    };
    return rv;
}
