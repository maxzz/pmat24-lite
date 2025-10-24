import { type InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import { atom, type PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Mani, FieldTyp, type ValueLife } from "@/store/manifest";
import { inputRingClasses } from "@/ui";
import { type FieldRowCtx, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { type FceItem, type FceDlgIn, type FceDlgOut, doOpenFceDlgAtom, creteOutBoxAtom, useFcItemsWithMru } from "@/store/3-field-catalog-atoms";
import { InputSelectUi } from "./1-dropdown";

const selectClasses = "\
px-2 py-1 w-full h-7 text-xs \
bg-mani-background \
border-mani-border-muted border \
rounded overflow-hidden cursor-pointer";

const selectAsRefClasses = "text-[0.6rem] text-blue-400! cursor-default";

type Column5_CatalogProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
    rowCtx: FieldRowCtx;
    fileUsCtx: FileUsCtx;
    onSelectCatItem: (item: FceItem | undefined) => void;
};

//TODO: MRU list is mixed with psw and txt. problem with save fc wo/ psw field
//TODO: more fields.. dialog has double selection. we set new selection but did not clear old one

export function Column5_Catalog({ rowCtx, fileUsCtx, onSelectCatItem, className, ...rest }: Column5_CatalogProps) {
    const { useItAtom, typeAtom, dbnameAtom, rfieldFormAtom } = rowCtx;
    const doSetFormFieldFromFc = useSetAtom(doSetFormFieldFromFcAtom);
    const doSetFormFieldNotFromFc = useSetAtom(doSetFormFieldNotFromFcAtom);

    const useIt = useAtomValue(useItAtom);
    const fType = useAtomValue(typeAtom);
    const fromFc = useAtomValue(rowCtx.fromFcAtom);
    const rfieldForm = useAtomValue(rfieldFormAtom);

    const selectValueAtom = useState(() => atom(fromFc?.fieldValue.dbname || '-1'))[0];
    const [selectValue, setSelectValue] = useAtom(selectValueAtom);

    useEffect(
        () => {
            //console.log(`Column5_Catalog rfieldForm: ${`${rfieldForm}`.padStart(2, ' ')} "${rowCtx.metaField.mani.displayname}"`);
            if (rfieldForm === Mani.FORMNAME.fieldcatalog) {
                setSelectValue(fromFc?.fieldValue.dbname || '-1');
            }
        }, [fromFc, rfieldForm]
    );

    //console.log(`Column5_Catalog "${rowCtx.metaField.mani.displayname}": %o, selectValue: ${selectValue}`, rowCtx.fromFc);

    const dropdownItems = useFcItemsWithMru(fType, fromFc);
    const doOpenDlg = useOpenFcDialog({ fileUsCtx, rowCtx });

    function onSelectValueChange(value: string) {
        if (value === '-1') {                   // "Not from catalog"
            doSetFormFieldNotFromFc(rowCtx);
            setSelectValue(value);
        } else if (value === '-2') {            // "More fields ..."
            doOpenDlg();
        } else {
            const newFceItem = getFceItemFromValue(dropdownItems, value);
            if (newFceItem) {
                doSetFormFieldFromFc(rowCtx, newFceItem);
                setSelectValue(newFceItem.fieldValue.dbname);
                // console.log(`onSelectCatItem value: "${value}", fceItem: %o`, optionItem);
            }
        }
    }

    return (
        <InputSelectUi
            triggerClasses={classNames(selectClasses, inputRingClasses, !useIt && "opacity-30", selectValue === '-1' && selectAsRefClasses)}
            items={dropdownItems}
            value={selectValue}
            onValueChange={onSelectValueChange}
            {...rest}
        />
    );
}

function useOpenFcDialog({ fileUsCtx, rowCtx }: { fileUsCtx: FileUsCtx; rowCtx: FieldRowCtx; }): () => void {
    const doOpenFldCatDialog = useSetAtom(doOpenFceDlgAtom);
    const doSetFormFieldFromFc = useSetAtom(doSetFormFieldFromFcAtom);

    const fceOutBoxAtom = useState(() => creteOutBoxAtom<FceDlgOut>())[0];
    const fceOutBox = useAtomValue(fceOutBoxAtom);

    useEffect(
        () => {
            const selectedItem = fceOutBox?.selectedItem;
            if (selectedItem) {
                console.log('%cSelected from dialog "%s", %o', 'color: tomato', selectedItem.fieldValue.displayname, selectedItem);
                doSetFormFieldFromFc(rowCtx, selectedItem);
            }
        }, [rowCtx, fceOutBox] // TODO: Why rowCtx is needed? We are using only fceOutBox, but trigger extra call to doSetFormFieldFromFc.
    );

    const fromFc = useAtomValue(rowCtx.fromFcAtom);

    const isPsw = fromFc?.fieldValue.fType === FieldTyp.psw;
    const dbid = fromFc?.fieldValue.dbname || rowCtx.metaField.mani.dbname;

    const doOpenDlg = useCallback(
        function doOpenDlg() {
            const fceAtoms = fileUsCtx.fileUs.fceAtomsRefForMani;
            const inData: FceDlgIn = {
                openItemPickerDlg: true,
                dbid,
                outBoxAtom: fceOutBoxAtom,
                showTxt: !isPsw,
                showPsw: !!isPsw,
            };
            doOpenFldCatDialog({ fceAtoms, inData });
        }, [isPsw, dbid, fceOutBoxAtom]
    );

    return doOpenDlg;
}

function getFceItemFromValue<T>(listItems: T[], value: string): FceItem | undefined {
    const optionItem = listItems.find(
        (item) => {
            return (
                typeof item === 'string'
                    ? item === value
                    : typeof item[1] === 'string'
                        ? item[1] === value
                        : item[1].key === value
            );
        }
    );
    const newFceItem = typeof optionItem?.[1] === 'string' ? undefined : optionItem?.[1].fceItem;
    return newFceItem;
}

// Action atoms

const doSetFormFieldNotFromFcAtom = atom(null,
    (get, set, rowCtx: FieldRowCtx) => {
        set(rowCtx.fromFcAtom, undefined);
        set(rowCtx.rfieldFormAtom, Mani.FORMNAME.noname);
    }
);

const doSetFormFieldFromFcAtom = atom(null,
    (get, set, rowCtx: FieldRowCtx, fceItem: FceItem) => {
        set(rowCtx.fromFcAtom, fceItem);
        set(rowCtx.rfieldFormAtom, Mani.FORMNAME.fieldcatalog);
        set(doCopyValueLifeFceItemToRowCtxAtom, rowCtx, fceItem);
    }
);

/**
 * Copy field catalog item valueLife to manifest item
 */
const doCopyValueLifeFceItemToRowCtxAtom = atom(null,
    (get, set, rowCtx: FieldRowCtx, fceItem: FceItem) => {

        const { dbname, valueAs, value, isRef, fType, isNon, } = fceItem.fieldValue;
        const valueLife: ValueLife = { valueAs, value, isRef, fType, isNon, };

        set(rowCtx.dbnameAtom, dbname);
        set(rowCtx.valueLifeAtom, valueLife);
    }
);
