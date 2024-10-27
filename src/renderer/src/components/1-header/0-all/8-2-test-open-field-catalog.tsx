import { atom, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenFldCatDialogAtom, type FldCatOutData, type FldCatInData } from "@/store";
import { useState } from "react";

export function TestOpenFieldCatalog() {
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFldCatDialogAtom);

    const outDataAtom = useState(() => atom<FldCatOutData | null>(null))[0];

    const inData:  Omit<FldCatInData, 'fceRoot'> = {
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
