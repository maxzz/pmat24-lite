import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { atom, type PrimitiveAtom as PA, useAtom, useAtomValue, useSetAtom } from "jotai";
import { type FileUsCtx } from "@/store/atoms/3-file-mani-atoms";
import { type FceItem, type FceDlgOut, getMruForFcItemAtom, doOpenFceDlgAtom, creteOutBoxAtom } from "@/store";
import { CatalogDropdown } from "./2-catalog-dropdown";
import { isKeyToClearDefault } from "../6-fields-shared-ui";
import { inputRingClasses } from "@/ui";
import { classNames, turnOffAutoComplete } from "@/utils";

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
    onSelectCatItem: (item: FceItem | undefined) => void;
    maniIsPassword: boolean | undefined; // Manifest field is password
    maniDbName: string;                  // Manifest field dbname
    fileUsCtx: FileUsCtx;
};

const CATALOG_Not = "Not from catalog";
const CATALOG_More = "More fields ...";

export function Column5_Catalog(props: Column5_CatalogProps) {

    const { useItAtom, onSelectCatItem, fieldCatAtom, maniIsPassword, maniDbName, className, fileUsCtx, ...rest } = props;

    const { fceItemsByType: catalogItemsByType, fecItem: catalogItem, } = useAtomValue(getMruForFcItemAtom)(maniIsPassword, maniDbName);

    const dropdownItems = [CATALOG_Not, ...catalogItemsByType.map((item) => item.fieldValue.displayname)];

    const fceAtomsRef = fileUsCtx.fileUs.fceAtomsRef;
    if (fceAtomsRef) {
        dropdownItems.push('-', CATALOG_More);
    }

    let catalogItemIdx = (catalogItem ? catalogItemsByType.findIndex((item) => item === catalogItem) : -1) + 1; // +1 to skip CATALOG_Not

    const textAtom = useState(() => atom(catalogItem?.fieldValue.displayname || CATALOG_Not))[0];
    const [inputText, setInputTextText] = useAtom(textAtom);
    const [selectedIndex, setSelectedIndex] = useState(catalogItemIdx);

    const useIt = useAtomValue(useItAtom);

    const doOpenFldCatDialog = useSetAtom(doOpenFceDlgAtom);

    const fldCatOutBoxAtom = useState(() => creteOutBoxAtom<FceDlgOut>())[0];
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
        if (fceAtomsRef && idx === dropdownItems.length - 1) {
            doOpenFldCatDialog({ fceAtoms: fceAtomsRef, inData: { dbid: catalogItem?.fieldValue.dbname, outBoxAtom: fldCatOutBoxAtom, showTxt: !maniIsPassword, showPsw: !!maniIsPassword } });
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
