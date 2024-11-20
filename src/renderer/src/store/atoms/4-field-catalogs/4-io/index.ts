import { type CatalogFile, TransformValue } from "@/store/manifest";
import { type FceItemValue } from "../9-types";

export function catalogItemInFileToFceItemValue(catalogName: CatalogFile.ItemInFile): FceItemValue {
    const rv: FceItemValue = {
        dispname: catalogName.dispname,
        dbname: catalogName.dbname,
        ...TransformValue.valueLife4Catalog(catalogName),
    };
    return rv;
}

export function fceItemValueToCatalogItemInFile(itemValue: FceItemValue): CatalogFile.ItemInFile {
    const rv: CatalogFile.ItemInFile = {
        dispname: itemValue.dispname,
        dbname: itemValue.dbname,
    };
    TransformValue.valueLife2Mani(itemValue, rv);
    return rv;
}
