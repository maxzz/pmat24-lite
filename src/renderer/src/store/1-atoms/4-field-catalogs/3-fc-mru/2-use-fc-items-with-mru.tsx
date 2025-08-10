import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type OptionTextValue2 } from "@/components/2-main/2-right/2-file-mani/1-form-editor/1-normal/1-fields/5-column-catalog/1-dropdown";
import { type FceItem, pswMruAtom, txtMruAtom, mruSize, emptyMruAtom, printFceItems } from "@/store/1-atoms/4-field-catalogs";

/**
 * List item can be string or object with key and fceItem or key and string
 *    * '-'
 *    * ['More fields ...', '-2']
 *    * ['Field name', { key: anyUniqueId, fceItem }]
 */
type OptionItemValue = string | {
    key: string;
    fceItem: FceItem;
};

export function useFcItemsWithMru(fieldTyp: FieldTyp | undefined, fromFc: FceItem | undefined): OptionTextValue2<OptionItemValue>[] {
    const isNonFcItem = fieldTyp !== FieldTyp.edit && fieldTyp !== FieldTyp.psw;
    const isPsw = fieldTyp === FieldTyp.psw;

    const mruItems = useAtomValue(isNonFcItem ? emptyMruAtom : isPsw ? pswMruAtom : txtMruAtom);

    // printFceItems(`useFcItemsWithMru. isPsw:${isPsw} "${fieldTyp}" items:\n`, mruItems);

    const rv = useMemo(() => {
        if (isNonFcItem) {
            return [CATALOG_NotFromFc];
        }

        const fType = isPsw ? FieldTyp.psw : FieldTyp.edit;
        const mruItemsByType = mruItems.filter((item) => item.fieldValue.fType === fType);

        if (fromFc) {
            const inMru = mruItemsByType.findIndex((item) => item.fieldValue.dbname === fromFc.fieldValue.dbname);
            if (inMru === -1) {
                mruItemsByType.push(fromFc);
            }
            mruItemsByType.splice(mruSize + 1);
        }

        //printFceItems(`MRU ${isPsw ? 'psw' : 'txt'}`, byType);

        const rv = mruItemsByType.map(makeOptionFromFceItem);

        if (rv.length > 0) {
            rv.unshift('-');
        }
        rv.unshift(CATALOG_NotFromFc);
        rv.push('-', CATALOG_MoreFields);

        return rv;
    }, [isNonFcItem, isPsw, fromFc, mruItems]);

    return rv;
}

function makeOptionFromFceItem(item: FceItem): OptionTextValue2<OptionItemValue> {
    return [
        item.fieldValue.displayname,
        {
            key: item.fieldValue.dbname,
            fceItem: item,
        }
    ];
}

const CATALOG_NotFromFc = ['Not from catalog', '-1'] as const;
const CATALOG_MoreFields = ['More fields ...', '-2'] as const;
