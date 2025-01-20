import { FieldTyp } from "@/store/manifest";
import { type FceDlgIn, type FceFilterOptions, type FceItem } from "../../9-types";

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

export function createFceFilterOptions(inData?: FceDlgIn): FceFilterOptions {
    const rv: FceFilterOptions = {
        search: '',
        showText: inData?.showTxt ?? true,
        showPassword: inData?.showPsw ?? true,
        ascending: undefined,
    };
    return rv;
}

// const filteredItemsAtom = atom(
//     (get) => (fceCtx: FceCtx) => {
//         const all = get(fceCtx.fceAtoms.allAtom);
//         const rv = all.filter((item) => item.fieldValue.fType === FieldTyp.edit);
//         return rv;
//     }
// );
