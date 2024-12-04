import { atom } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type FceFilterOptions, type FceCtx, type FceItem } from "../../9-types";

export function createEmptyFceFilterOptions(): FceFilterOptions {
    return {
        search: '',
        showText: true,
        showPassword: true,
        ascending: undefined,
    };
}

export function filterFceItems(items: FceItem[], filterOptions: FceFilterOptions): FceItem[] {
    const { search, showText, showPassword, ascending } = filterOptions;

    let filteredItems = items.filter(
        (item) => {
            const { fType, displayname } = item.fieldValue;

            if (!showText && fType === FieldTyp.edit) {
                return false;
            }

            if (!showPassword && fType === FieldTyp.psw) {
                return false;
            }

            if (!search) {
                return true;
            }

            const include = showText && displayname.toLowerCase().includes(search.toLowerCase());
            return include;
        }
    );

    if (ascending !== undefined) {
        filteredItems = filteredItems.sort((a, b) => {
            if (ascending) {
                return a.fieldValue.displayname.localeCompare(b.fieldValue.displayname);
            } else {
                return b.fieldValue.displayname.localeCompare(a.fieldValue.displayname);
            }
        });
    }

    return filteredItems;
}

const filteredItemsAtom = atom(
    (get) => (fceCtx: FceCtx) => {
        const all = get(fceCtx.fceAtoms.allAtom);
        const rv = all.filter((item) => item.fieldValue.fType === FieldTyp.edit);
        return rv;
    }
);
