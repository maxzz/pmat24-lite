import { type ChangeEvent, type InputHTMLAttributes, useEffect, useMemo, useState } from "react";
import { atom, type PrimitiveAtom as PA, useAtom, useAtomValue, useSetAtom } from "jotai";
import { type NormalField, type FileUsCtx } from "@/store/atoms/3-file-mani-atoms";
import { type FceItem, type FceDlgOut, getMruForFcItemAtom, doOpenFceDlgAtom, creteOutBoxAtom, txtMruAtom, pswMruAtom, mruSize, printFceItems } from "@/store";
import { CatalogDropdown } from "./2-catalog-dropdown";
import { isKeyToClearDefault } from "../6-fields-shared-ui";
import { inputRingClasses } from "@/ui";
import { classNames, turnOffAutoComplete } from "@/utils";
import { InputSelectUi, type OptionTextValue2 } from "./1-dropdown";
import { FieldTyp } from "@/store/manifest";

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
    rowCtx: NormalField.RowCtx;
};

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

function fceItemToOption(item: FceItem): OptionTextValue2<OptionItemValue> {
    return [item.fieldValue.displayname, { key: item.fieldValue.dbname, fceItem: item }];
}

function mruToOptions(fecItems: FceItem[]): OptionTextValue2<OptionItemValue>[] {
    return fecItems.map(fceItemToOption);
}

function useMruItems(isPsw: boolean | undefined, fromFc: FceItem | undefined): OptionTextValue2<OptionItemValue>[] {
    const fType = isPsw ? FieldTyp.psw : FieldTyp.edit;
    const mruItems = useAtomValue(isPsw ? pswMruAtom : txtMruAtom);

    const rv = useMemo(() => {
        const byType = mruItems.filter((item) => item.fieldValue.fType === fType);

        if (fromFc) {
            const notThere = byType.findIndex((item) => item.fieldValue.dbname === fromFc.fieldValue.dbname);

            if (notThere === -1 && fromFc) {
                byType.push(fromFc);
            }

            byType.splice(mruSize);
        }

        printFceItems(`MRU ${isPsw ? 'psw' : 'txt'}`, byType);

        const rv = mruToOptions(byType);

        if (rv.length > mruSize) { //TODO: add only if we in main field catalog dialog
            rv.push('-', CATALOG_More);
        }

        if (fromFc) {
            rv.unshift(CATALOG_Not, '-');
        }

        return rv;
    }, [isPsw, fromFc, mruItems]);

    return rv;
}

const CATALOG_Not = ['Not from catalog', '-1'] as const;
const CATALOG_More = ['More fields ...', '-2'] as const;

export function Column5_Catalog(props: Column5_CatalogProps) {

    const { useItAtom, onSelectCatItem, fieldCatAtom, maniIsPassword, maniDbName, className, fileUsCtx, rowCtx, ...rest } = props;
    const fceAtomsRef = fileUsCtx.fileUs.fceAtomsRefForMani;

    const listItems2 = useMruItems(maniIsPassword, rowCtx.fromFc);

    // const mruNewItems = useAtomValue(maniIsPassword ? pswMruAtom : txtMruAtom);
    // const listItems: OptionTextValue2<OptionItemValue>[] = mruNewItems.map((item) => ([item.fieldValue.displayname, { key: item.fieldValue.dbname, fceItem: item }]));
    // if (rowCtx.fromFc) {
    //     mruNewItems.push(rowCtx.fromFc); //TODO: if not in mru, add to mru and check the list size
    // }
    // if (fceAtomsRef) { //TODO: add only if we in main field catalog dialog
    //     listItems.push('-', CATALOG_More);
    // }
    // listItems.unshift(CATALOG_Not, '-'); //TODO: add '-' if we have items

    const value = rowCtx.fromFc?.fieldValue.dbname || maniDbName;

    console.log(`dropdown value: "${value}", ${rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw ? 'psw' : 'txt'}`);

    //

    // const { mruItems, thisFceItem: fceItem } = useAtomValue(getMruForFcItemAtom)(maniIsPassword, maniDbName);
    // const dropdownItems = [CATALOG_Not, ...mruItems.map((item) => item.fieldValue.displayname)];
    // if (fceAtomsRef) {
    //     dropdownItems.push('-', CATALOG_More[0]);
    // }
    // let thisItemIdx = (fceItem ? mruItems.findIndex((item) => item === fceItem) : -1) + 1; // +1 to skip CATALOG_Not

    //#region on select

    // const textAtom = useState(() => atom(fceItem?.fieldValue.displayname || CATALOG_Not))[0];
    // const [inputText, setInputTextText] = useAtom(textAtom);
    // const [selectedIndex, setSelectedIndex] = useState(thisItemIdx);
    // function onSetDropdownIndex(idx: number) {
    //     if (fceAtomsRef && idx === dropdownItems.length - 1) {
    //         doOpenFldCatDialog({ fceAtoms: fceAtomsRef, inData: { dbid: fceItem?.fieldValue.dbname, outBoxAtom: fldCatOutBoxAtom, showTxt: !maniIsPassword, showPsw: !!maniIsPassword } });
    //         return;
    //     }
    //     setInputTextText(dropdownItems[idx]);
    //     setSelectedIndex(idx);
    // }

    //#endregion

    const useIt = useAtomValue(useItAtom);

    //#region dialog start

    const doOpenFldCatDialog = useSetAtom(doOpenFceDlgAtom);

    // const fldCatOutBoxAtom = useState(() => creteOutBoxAtom<FceDlgOut>())[0];
    // const fldCatOutBox = useAtomValue(fldCatOutBoxAtom);

    // useEffect(() => {
    //     if (fldCatOutBox) {
    //         console.log('Result of the field catalog dialog', fldCatOutBox);
    //     }
    // }, [fldCatOutBox]);

    //#endregion

    function onValueChange(value: string) {
        const fceItem = listItems2.find((item) => (typeof item === 'string' ? item === value : typeof item[1] === 'string' ? item[1] === value : item[1].key === value));

        if (value === '-1') {
            return;
        }

        if (value === '-2') {
            // const dbid = rowCtx.fromFc?.fieldValue.dbname || maniDbName;
            // doOpenFldCatDialog({ fceAtoms: fceAtomsRef, inData: { dbid, outBoxAtom: fldCatOutBoxAtom, showTxt: !maniIsPassword, showPsw: !!maniIsPassword } });
            return;
        }

        console.log(`onSelectCatItem value: "${value}", fceItem: %o`, fceItem);
    }

    return (
        <div className={classNames(inputParentClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer", className)} {...rest}>

            <InputSelectUi items={listItems2} value={value} onValueChange={onValueChange} />

            {/* <input
                className={classNames(inputClasses, ~selectedIndex && "text-[0.6rem] !text-blue-400")} //TODO: we can use placeholder on top and ingone all events on placeholder and do multiple lines
                value={inputText}
                onChange={onSetInputText}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                readOnly
                multiple
                {...turnOffAutoComplete}
            />

            <CatalogDropdown items={dropdownItems} selectedIndex={selectedIndex} onSetIndex={onSetDropdownIndex} /> */}
        </div>
    );

    // function onSetInputText({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    //     if (value) {
    //         setInputTextText(value);
    //         setSelectedIndex(-1);
    //     }
    //     else {
    //         setInputTextText(CATALOG_Not);
    //         setSelectedIndex(0);
    //     };
    // }

    // function onSetKey(event: React.KeyboardEvent) {
    //     if (~selectedIndex && isKeyToClearDefault(event.key)) {
    //         setInputTextText('');
    //         setSelectedIndex(-1);
    //     }
    // }

    // function onBlur() {
    //     ~~selectedIndex && !inputText && onSetDropdownIndex(0);
    // }
}

//TODO: buttons are not stored in field catalog
//TODO: buttons should not have dbname (it is useless, they don't have state to save)
