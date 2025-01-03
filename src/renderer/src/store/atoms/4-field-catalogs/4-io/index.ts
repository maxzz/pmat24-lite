import { type CatalogFile, fieldTyp2Obj, TransformValue } from "@/store/manifest";
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
        ...fieldTyp2Obj(itemValue.fType),
    };
    TransformValue.valueLife2Mani(itemValue, rv);
    return rv;
}
