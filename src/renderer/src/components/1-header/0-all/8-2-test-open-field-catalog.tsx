import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { doOpenFldCatDialogAtom, type FldCatInData, type FldCatOutData } from "@/store";
import { Button } from "@/ui";

export function TestOpenFieldCatalog() {
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFldCatDialogAtom);

    const outDataAtom = useState(() => atom<FldCatOutData | null>(null))[0];

    const inData: Omit<FldCatInData, 'fceAtoms'> = {
        showTxt: true,
        showPsw: true,
        outBoxAtom: outDataAtom,
    };

    return (
        <Button className="text-[.65rem]" onClick={() => doOpenFieldCatalogDialog({ fceRoot: undefined, inData })}>
            Field Catalog...
        </Button>
    );
}
