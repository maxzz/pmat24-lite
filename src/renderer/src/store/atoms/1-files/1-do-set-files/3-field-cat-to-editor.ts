import { type CatalogFile, type Mani } from '@/store/manifest';
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

function catalogItemInFileToFieldValue(catalogName: CatalogFile.ItemInFile): Mani.FieldValue {
    const { dispname, ...rest } = catalogName;
    return {
        displayname: dispname,
        ...rest,
    };
}
