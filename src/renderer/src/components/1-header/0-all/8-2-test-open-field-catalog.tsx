import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { doOpenFldCatDialogAtom, type Fce0DlgIn, type Fce0DlgOut } from "@/store";
import { Button } from "@/ui";

export function TestOpenFieldCatalog() {
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFldCatDialogAtom);

    const outDataAtom = useState(() => atom<Fce0DlgOut | null>(null))[0];

    const inData: Omit<Fce0DlgIn, 'fceAtoms'> = {
        showTxt: true,
        showPsw: true,
        outBoxAtom: outDataAtom,
    };

    return (
        <Button className="text-[.65rem]" onClick={() => doOpenFieldCatalogDialog({ inData })}>
            Field Catalog...
        </Button>
    );
}
