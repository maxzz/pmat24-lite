import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { doOpenFceDlgAtom, type FceDlgIn, type FceDlgOut } from "@/store";
import { Button } from "@/ui";

export function TestOpenFieldCatalog() {
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFceDlgAtom);

    const outDataAtom = useState(() => atom<FceDlgOut | null>(null))[0];

    const inData: FceDlgIn = {
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
