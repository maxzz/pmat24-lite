import { CatalogItem } from '@/store/manifest';

export * from './0-all-items';
export * from './2-mru-items';
export * from './1-ui-state';

// For debugging

export function mruToString(items: CatalogItem[]) {
    return JSON.stringify(items.map((item) => `${JSON.stringify(item)}\n`), null, 4);
    //console.log('buildMruWItem', `\n${JSON.stringify(item)}\n\n`, mruToString(rv));
}
