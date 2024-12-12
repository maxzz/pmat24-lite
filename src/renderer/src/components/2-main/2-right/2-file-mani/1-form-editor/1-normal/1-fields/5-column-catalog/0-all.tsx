import { type ChangeEvent, type InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import { atom, type PrimitiveAtom as PA, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type NormalField, type FileUsCtx } from "@/store/atoms/3-file-mani-atoms";
import { type FceDlgIn, useMruItems } from "@/store/atoms/4-field-catalogs";
import { type FceItem, type FceDlgOut, getMruForFcItemAtom, doOpenFceDlgAtom, creteOutBoxAtom } from "@/store";
import { CatalogDropdown } from "./2-catalog-dropdown";
import { isKeyToClearDefault } from "../6-fields-shared-ui";
import { inputRingClasses } from "@/ui";
import { classNames, turnOffAutoComplete } from "@/utils";
import { InputSelectUi } from "./1-dropdown";

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
    fileUsCtx: FileUsCtx;
    rowCtx: NormalField.RowCtx;
};

export function Column5_Catalog(props: Column5_CatalogProps) {
    const { useItAtom, onSelectCatItem, fieldCatAtom, className, fileUsCtx, rowCtx, ...rest } = props;

    const useIt = useAtomValue(useItAtom);
    const dbid = rowCtx.fromFc?.fieldValue.dbname || rowCtx.metaField.mani.dbname;
    const isPsw = rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw;

    const listItems = useMruItems(isPsw, rowCtx.fromFc);
    const doOpenDlg = useFcDialog({ fileUsCtx, rowCtx });

    console.log(`render dropdown value: "${dbid}", ${rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw ? 'psw' : 'txt'}`);

    function onValueChange(value: string) {
        const fceItem = listItems.find((item) => (typeof item === 'string' ? item === value : typeof item[1] === 'string' ? item[1] === value : item[1].key === value));

        if (value === '-1') {
            return;
        }

        if (value === '-2') {
            doOpenDlg();
            return;
        }

        console.log(`onSelectCatItem value: "${value}", fceItem: %o`, fceItem);
    }

    return (
        <div className={classNames(inputParentClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            <InputSelectUi items={listItems} value={dbid} onValueChange={onValueChange} />
        </div>
    );
}

function useFcDialog({ fileUsCtx, rowCtx }: { fileUsCtx: FileUsCtx; rowCtx: NormalField.RowCtx; }): () => void {

    const doOpenFldCatDialog = useSetAtom(doOpenFceDlgAtom);

    const fldCatOutBoxAtom = useState(() => creteOutBoxAtom<FceDlgOut>())[0];
    const fldCatOutBox = useAtomValue(fldCatOutBoxAtom);

    const isPsw = rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw;
    const dbid = rowCtx.fromFc?.fieldValue.dbname || rowCtx.metaField.mani.dbname;

    useEffect(() => {
        if (fldCatOutBox) {
            console.log('Result of the field catalog dialog', fldCatOutBox);
        }
    }, [fldCatOutBox]);

    const doOpenDlg = useCallback(
        function doOpenDlg() {
            const fceAtoms = fileUsCtx.fileUs.fceAtomsRefForMani;
            const inData: FceDlgIn = {
                dbid,
                outBoxAtom: fldCatOutBoxAtom,
                showTxt: !isPsw,
                showPsw: !!isPsw,
            };
            doOpenFldCatDialog({ fceAtoms, inData });
        }, [dbid, isPsw]
    );

    return doOpenDlg;
}
