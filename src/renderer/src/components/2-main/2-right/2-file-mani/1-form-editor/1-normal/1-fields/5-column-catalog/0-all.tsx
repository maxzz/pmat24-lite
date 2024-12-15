import { type InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import { atom, type PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, Mani } from "@/store/manifest";
import { type NormalField, type FileUsCtx } from "@/store/atoms/3-file-mani-atoms";
import { type FceItem, type FceDlgIn, type FceDlgOut, doOpenFceDlgAtom, creteOutBoxAtom, useMruItems } from "@/store";
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

const setSelectedItemFromFcAtom = atom(null, (get, set, rowCtx: NormalField.RowCtx, fceItem: FceItem | undefined) => {
    rowCtx.fromFc = fceItem;
    set(rowCtx.rfieldFormAtom, Mani.FORMNAME.fieldcatalog);
});

export function Column5_Catalog({ rowCtx, fileUsCtx, onSelectCatItem, className, ...rest }: Column5_CatalogProps) {
    const { useItAtom, dbnameAtom } = rowCtx;
    const setSelectedItem = useSetAtom(setSelectedItemFromFcAtom);

    const useIt = useAtomValue(useItAtom);

    const selectValueAtom = useState(() => atom(rowCtx.fromFc?.fieldValue.dbname || '-1'))[0];
    const [selectValue, setSelectValue] = useAtom(selectValueAtom);

    // const value0 = rowCtx.fromFc?.fieldValue.dbname || rowCtx.metaField.mani.dbname;
    const isPsw = rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw;

    const listItems = useMruItems(isPsw, rowCtx.fromFc);
    const doOpenDlg = useFcDialog({ fileUsCtx, rowCtx, selectValueAtom });

    function onSelectValueChange(value: string) {
        if (value === '-1') {
            setSelectValue('-1');
            return;
        } else if (value === '-2') {
            doOpenDlg();
            return;
        }

        const optionItem = listItems.find((item) => (typeof item === 'string' ? item === value : typeof item[1] === 'string' ? item[1] === value : item[1].key === value));
        const newFceItem = typeof optionItem?.[1] === 'string' ? undefined : optionItem?.[1].fceItem;

        if (newFceItem) {
            setSelectValue(newFceItem.fieldValue.dbname);
            setSelectedItem(rowCtx, newFceItem);
        }

        console.log(`onSelectCatItem value: "${value}", fceItem: %o`, optionItem);
    }

    console.log(`render dropdown, value: "${selectValue}", ${rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw ? 'psw' : 'txt'}`);

    return (
        <InputSelectUi
            triggerClasses={classNames(selectClasses, inputRingClasses, !useIt && "opacity-30", selectValue === '-1' && selectAsRefClasses)}
            items={listItems}
            value={selectValue}
            onValueChange={onSelectValueChange}
            {...rest}
        />
    );
}

function useFcDialog({ fileUsCtx, rowCtx, selectValueAtom }: { fileUsCtx: FileUsCtx; rowCtx: NormalField.RowCtx; selectValueAtom: PrimitiveAtom<string>; }): () => void {
    const doOpenFldCatDialog = useSetAtom(doOpenFceDlgAtom);

    const fceOutBoxAtom = useState(() => creteOutBoxAtom<FceDlgOut>())[0];
    const fceOutBox = useAtomValue(fceOutBoxAtom);

    const isPsw = rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw;
    const dbid = rowCtx.fromFc?.fieldValue.dbname || rowCtx.metaField.mani.dbname;

    useEffect(() => {
        if (fceOutBox) {
            console.log('Result of the field catalog dialog', fceOutBox);
        }
    }, [fceOutBox]);

    const doOpenDlg = useCallback(
        function doOpenDlg() {
            const fceAtoms = fileUsCtx.fileUs.fceAtomsRefForMani;
            const inData: FceDlgIn = {
                dbid,
                outBoxAtom: fceOutBoxAtom,
                showTxt: !isPsw,
                showPsw: !!isPsw,
            };
            doOpenFldCatDialog({ fceAtoms, inData });
        }, [dbid, isPsw]
    );

    return doOpenDlg;
}
