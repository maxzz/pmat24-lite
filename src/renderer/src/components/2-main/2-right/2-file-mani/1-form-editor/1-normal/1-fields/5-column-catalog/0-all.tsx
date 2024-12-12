import { type InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import { type PrimitiveAtom as PA, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type NormalField, type FileUsCtx } from "@/store/atoms/3-file-mani-atoms";
import { type FceDlgIn, useMruItems } from "@/store/atoms/4-field-catalogs";
import { type FceItem, type FceDlgOut, doOpenFceDlgAtom, creteOutBoxAtom } from "@/store";
import { inputRingClasses } from "@/ui";
import { classNames } from "@/utils";
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
    onSelectCatItem: (item: FceItem | undefined) => void;
    fileUsCtx: FileUsCtx;
    rowCtx: NormalField.RowCtx;
};

export function Column5_Catalog(props: Column5_CatalogProps) {
    const { onSelectCatItem, className, fileUsCtx, rowCtx, ...rest } = props;
    const { useItAtom, dbnameAtom } = rowCtx;

    const useIt = useAtomValue(useItAtom);

    // const v = useAtomValue();

    const value = rowCtx.fromFc?.fieldValue.dbname || rowCtx.metaField.mani.dbname;
    const isPsw = rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw;

    const listItems = useMruItems(isPsw, rowCtx.fromFc);
    const doOpenDlg = useFcDialog({ fileUsCtx, rowCtx });

    function onValueChange(value: string) {
        if (value === '-1') {
            return;
        } else if (value === '-2') {
            doOpenDlg();
            return;
        }

        const fceItem = listItems.find((item) => (typeof item === 'string' ? item === value : typeof item[1] === 'string' ? item[1] === value : item[1].key === value));
        console.log(`onSelectCatItem value: "${value}", fceItem: %o`, fceItem);
    }

    console.log(`render dropdown, value: "${value}", ${rowCtx.fromFc?.fieldValue.fType === FieldTyp.psw ? 'psw' : 'txt'}`);

    return (
        <div className={classNames(inputParentClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            <InputSelectUi items={listItems} value={value} onValueChange={onValueChange} />
        </div>
    );
}

function useFcDialog({ fileUsCtx, rowCtx }: { fileUsCtx: FileUsCtx; rowCtx: NormalField.RowCtx; }): () => void {
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
