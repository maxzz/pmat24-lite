import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { atom, PrimitiveAtom as PA, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FldCatOutData, getMruFldCatForItemAtom, openFldCatDialogAtom, creteOutBoxAtom } from "@/store";
import { CatalogItem, Meta } from "@/store/manifest";
import { CatalogDropdown, isKeyToClearDefault } from "./2-catalog-dropdown";
import { classNames } from "@/utils";

const CATALOG_Not = "Not from catalog";
const CATALOG_More = "More fields ...";

const columnSizeClasses = "grid grid-cols-[minmax(0,1fr)_auto] bg-primary-700 rounded overflow-hidden";

const columnRingClasses = "\
ring-primary-600 \
focus-within:ring-primary-400 \
focus-within:ring-offset-primary-800 \
focus-within:ring-1 \
focus-within:ring-offset-1";

const inputClasses = "px-2 py-3 h-8 !bg-primary-700 !text-primary-200 outline-none";

type Column4_CatalogProps = {
    useItAtom: PA<boolean>;
    fieldCatAtom: PA<string>;
    onSelectCatItem: (item: CatalogItem | undefined) => void;
    field: Meta.Field;
};

export function Column4_Catalog(props: Column4_CatalogProps & InputHTMLAttributes<HTMLInputElement>) {
    const { useItAtom, onSelectCatItem, fieldCatAtom, field, className, ...rest } = props;

    const { catalogItemsByType, catalogItem, } = useAtomValue(getMruFldCatForItemAtom)(field.mani.password, field.mani.dbname);

    const dropdownItems = [CATALOG_Not, ...catalogItemsByType.map((item) => item.displayname), '-', CATALOG_More];
    let catalogItemIdx = (catalogItem ? catalogItemsByType.findIndex((item) => item === catalogItem) : -1) + 1; // +1 to skip CATALOG_Not

    const textAtom = useState(() => atom(catalogItem?.displayname || CATALOG_Not))[0];
    const [inputText, setInputTextText] = useAtom(textAtom);
    const [selectedIndex, setSelectedIndex] = useState(catalogItemIdx);

    const useIt = useAtomValue(useItAtom);

    const openFldCatDialog = useSetAtom(openFldCatDialogAtom);

    const fldCatOutBoxAtom = useState(creteOutBoxAtom<FldCatOutData>())[0];
    const fldCatOutBox = useAtomValue(fldCatOutBoxAtom);

    useEffect(() => {
        if (fldCatOutBox) {
            console.log('outData', fldCatOutBox);
        }
    }, [fldCatOutBox]);

    return (
        <div className={classNames(columnSizeClasses, columnRingClasses, !useIt && "opacity-30 cursor-pointer", className,)} {...rest}>
            
            <input
                className={classNames(inputClasses, ~selectedIndex && "text-[0.6rem] !text-blue-400")} //TODO: we can use placeholder on top and ingone all events on placeholder and do multiple lines
                value={inputText}
                onChange={onSetInputText}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                multiple autoComplete="off" list="autocompleteOff" spellCheck={false}
            />

            <CatalogDropdown items={dropdownItems} selectedIndex={selectedIndex} onSetIndex={onSetDropdownIndex} />
        </div>
    );

    function onSetDropdownIndex(idx: number) {
        if (idx === dropdownItems.length - 1) {
            openFldCatDialog({ dbid: catalogItem?.dbname, outBoxAtom: fldCatOutBoxAtom });
            return;
        }
        setInputTextText(dropdownItems[idx]);
        setSelectedIndex(idx);
    }

    function onSetInputText({ target: { value } }: ChangeEvent<HTMLInputElement>) {
        if (value) {
            setInputTextText(value);
            setSelectedIndex(-1);
        }
        else {
            setInputTextText(CATALOG_Not);
            setSelectedIndex(0);
        };
    }

    function onSetKey(event: React.KeyboardEvent) {
        if (~selectedIndex && isKeyToClearDefault(event.key)) {
            setInputTextText('');
            setSelectedIndex(-1);
        }
    }

    function onBlur() {
        ~~selectedIndex && !inputText && onSetDropdownIndex(0);
    }
}

//TODO: buttons are not stored in field catalog
//TODO: buttons should not have dbname (it is useless, they don't have state to save)
