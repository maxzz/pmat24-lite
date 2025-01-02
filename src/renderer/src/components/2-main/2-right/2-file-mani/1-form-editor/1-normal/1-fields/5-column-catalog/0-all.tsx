import { type InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import { atom, type PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Mani, FieldTyp } from "@/store/manifest";
import { type NormalField, type FileUsCtx } from "@/store/atoms/3-file-mani-atoms";
import { type FceItem, type FceDlgIn, type FceDlgOut, doOpenFceDlgAtom, creteOutBoxAtom, useFcItemsWithMru } from "@/store";
import { inputRingClasses } from "@/ui";
import { classNames } from "@/utils";
import { InputSelectUi } from "./1-dropdown";

const selectClasses = "\
px-2 py-1 w-full h-7 text-xs \
bg-mani-background \
border-mani-border-muted border \
rounded overflow-hidden cursor-pointer";

const selectAsRefClasses = "text-[0.6rem] !text-blue-400 cursor-default";

type Column5_CatalogProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
    rowCtx: NormalField.RowCtx;
    fileUsCtx: FileUsCtx;
    onSelectCatItem: (item: FceItem | undefined) => void;
};

export function Column5_Catalog({ rowCtx, fileUsCtx, onSelectCatItem, className, ...rest }: Column5_CatalogProps) {
    const { useItAtom, typeAtom, dbnameAtom, rfieldFormAtom } = rowCtx;
    const doSetFormFieldFromFc = useSetAtom(doSetFormFieldFromFcAtom);
    const doSetFormFieldNotFromFc = useSetAtom(doSetFormFieldNotFromFcAtom);

    const useIt = useAtomValue(useItAtom);
    const fType = useAtomValue(typeAtom);

    const selectValueAtom = useState(() => atom(rowCtx.fromFc?.fieldValue.dbname || '-1'))[0];
    const [selectValue, setSelectValue] = useAtom(selectValueAtom);

    const rfieldForm = useAtomValue(rfieldFormAtom);
    useEffect(
        () => {
            console.log(`Column5_Catalog "${rowCtx.metaField.mani.displayname}": rfieldForm: ${rfieldForm}`);

            if (rfieldForm === Mani.FORMNAME.fieldcatalog) {
                setSelectValue(rowCtx.fromFc?.fieldValue.dbname || '-1');
            }

        }, [rfieldForm]
    );

    //console.log(`Column5_Catalog "${rowCtx.metaField.mani.displayname}": %o, selectValue: ${selectValue}`, rowCtx.fromFc);

    const dropdownItems = useFcItemsWithMru(fType, rowCtx.fromFc);
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

function useOpenFcDialog({ fileUsCtx, rowCtx }: { fileUsCtx: FileUsCtx; rowCtx: NormalField.RowCtx; }): () => void {
    const doOpenFldCatDialog = useSetAtom(doOpenFceDlgAtom);
    const doSetFormFieldFromFc = useSetAtom(doSetFormFieldFromFcAtom);

    const fceOutBoxAtom = useState(() => creteOutBoxAtom<FceDlgOut>())[0];
    const fceOutBox = useAtomValue(fceOutBoxAtom);

    useEffect(() => {
        if (fceOutBox) {
            console.log('Result of the field catalog dialog', fceOutBox);
            doSetFormFieldFromFc(rowCtx, fceOutBox.selectedItem);
        }
    }, [rowCtx, fceOutBox]);

    const isPsw = rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw;
    const dbid = rowCtx.fromFc?.fieldValue.dbname || rowCtx.metaField.mani.dbname;

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
        }, [isPsw, dbid]
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

const doSetFormFieldNotFromFcAtom = atom(null, (get, set, rowCtx: NormalField.RowCtx) => {
    rowCtx.fromFc = undefined;
    set(rowCtx.rfieldFormAtom, Mani.FORMNAME.noname);
});

const doSetFormFieldFromFcAtom = atom(null, (get, set, rowCtx: NormalField.RowCtx, fceItem: FceItem | undefined) => {
    rowCtx.fromFc = fceItem;
    set(rowCtx.rfieldFormAtom, Mani.FORMNAME.fieldcatalog);

    //TODO: copy field catalog item valueLife to manifest item
});

const doSetFormFieldDisconnectedFromFcAtom = atom(null, (get, set, rowCtx: NormalField.RowCtx) => {
    rowCtx.fromFc = undefined;
    set(rowCtx.rfieldFormAtom, Mani.FORMNAME.noname);
});
