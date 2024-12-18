import { type CatalogFile, type CatalogItem, TransformValue } from "@/store/manifest";
import { type FceItemValue } from "../9-types";

export function catalogItemInFileToFceItemValue(catalogName: CatalogFile.ItemInFile): FceItemValue {
    const rv: FceItemValue = {
        displayname: catalogName.dispname,
        dbname: catalogName.dbname,
        ownernote: catalogName.ownernote || '',
        ...TransformValue.valueLife4Catalog(catalogName),
    };
    return rv;
}

export function fceItemValueToCatalogItemInFile(itemValue: FceItemValue): CatalogFile.ItemInFile {
    const rv: CatalogFile.ItemInFile = {
        dispname: itemValue.displayname,
        dbname: itemValue.dbname,
        ownernote: itemValue.ownernote,
    };
    TransformValue.valueLife2Mani(itemValue, rv);
    return rv;
}

// export function fceItemValueToFcItem(itemValue: FceItemValue): CatalogItem {

//     const valueLife: TransformValue.valueLife2ManiLogicReturn = {};

//     TransformValue.valueLife2Mani(itemValue, valueLife);

//     const rv: CatalogItem = {
//         displayname: itemValue.displayname,
//         dbname: itemValue.dbname,
//         ownernote: itemValue.ownernote,
//         ...valueLife,
//     };

//     return rv;
// }
