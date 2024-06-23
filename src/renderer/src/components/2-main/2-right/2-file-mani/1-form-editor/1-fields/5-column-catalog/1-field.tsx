import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { atom, PrimitiveAtom as PA, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FldCatOutData, getMruFldCatForItemAtom, openFldCatDialogAtom, creteOutBoxAtom } from "@/store";
import { CatalogItem, Mani } from "@/store/manifest";
import { CatalogDropdown } from "./2-catalog-dropdown";
import { isKeyToClearDefault } from "../../6-fields-shared-ui";
import { classNames, turnOffAutoComplete } from "@/utils";
import { inputRingClasses } from "@/ui";

const inputParentClasses = "\
h-7 grid grid-cols-[minmax(0,1fr)_auto] \
\
bg-mani-background \
\
border-mani-border-muted border \
\
rounded overflow-hidden";

const inputClasses = "\
px-2 py-3 h-7 \
bg-mani-background text-mani-foreground \
outline-none";

type Column5_CatalogProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PA<boolean>;
    fieldCatAtom: PA<string>;
    onSelectCatItem: (item: CatalogItem | undefined) => void;
    maniField: Mani.Field;
};

const CATALOG_Not = "Not from catalog";
const CATALOG_More = "More fields ...";

export function Column5_Catalog(props: Column5_CatalogProps) {
    
    const { useItAtom, onSelectCatItem, fieldCatAtom, maniField, className, ...rest } = props;

    const { catalogItemsByType, catalogItem, } = useAtomValue(getMruFldCatForItemAtom)(maniField.password, maniField.dbname);

    const dropdownItems = [CATALOG_Not, ...catalogItemsByType.map((item) => item.displayname), '-', CATALOG_More];
    let catalogItemIdx = (catalogItem ? catalogItemsByType.findIndex((item) => item === catalogItem) : -1) + 1; // +1 to skip CATALOG_Not

    const textAtom = useState(() => atom(catalogItem?.displayname || CATALOG_Not))[0];
    const [inputText, setInputTextText] = useAtom(textAtom);
    const [selectedIndex, setSelectedIndex] = useState(catalogItemIdx);

    const useIt = useAtomValue(useItAtom);

    const openFldCatDialog = useSetAtom(openFldCatDialogAtom);

    const fldCatOutBoxAtom = useState(() => creteOutBoxAtom<FldCatOutData>())[0];
    const fldCatOutBox = useAtomValue(fldCatOutBoxAtom);

    useEffect(() => {
        if (fldCatOutBox) {
            console.log('Result of the field catalog dialog', fldCatOutBox);
        }
    }, [fldCatOutBox]);

    return (
        <div className={classNames(inputParentClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer", className)} {...rest}>

            <input
                className={classNames(inputClasses, ~selectedIndex && "text-[0.6rem] !text-blue-400")} //TODO: we can use placeholder on top and ingone all events on placeholder and do multiple lines
                value={inputText}
                onChange={onSetInputText}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                multiple
                {...turnOffAutoComplete}
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
