import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { type FceItem, pswMruAtom, txtMruAtom, mruSize, printFceItems } from "@/store";
import { FieldTyp } from "@/store/manifest";
import type { OptionTextValue2 } from "../../../../components/2-main/2-right/2-file-mani/1-form-editor/1-normal/1-fields/5-column-catalog/1-dropdown";

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

const CATALOG_Not = ['Not from catalog', '-1'] as const;
const CATALOG_More = ['More fields ...', '-2'] as const;

function fceItemToOption(item: FceItem): OptionTextValue2<OptionItemValue> {
    return [item.fieldValue.displayname, { key: item.fieldValue.dbname, fceItem: item }];
}

export function useMruItems(isPsw: boolean | undefined, fromFc: FceItem | undefined): OptionTextValue2<OptionItemValue>[] {
    const fType = isPsw ? FieldTyp.psw : FieldTyp.edit;
    const mruItems = useAtomValue(isPsw ? pswMruAtom : txtMruAtom);

    const rv = useMemo(() => {
        const byType = mruItems.filter((item) => item.fieldValue.fType === fType);

        if (fromFc) {
            const notThere = byType.findIndex((item) => item.fieldValue.dbname === fromFc.fieldValue.dbname);

            if (notThere === -1) {
                byType.push(fromFc);
            }

            byType.splice(mruSize + 1);
        }

        //printFceItems(`MRU ${isPsw ? 'psw' : 'txt'}`, byType);

        const rv = byType.map(fceItemToOption);

        if (rv.length > 0) {
            rv.unshift('-');
        }
        rv.unshift(CATALOG_Not);
        rv.push('-', CATALOG_More);

        return rv;
    }, [isPsw, fromFc, mruItems]);

    return rv;
}
