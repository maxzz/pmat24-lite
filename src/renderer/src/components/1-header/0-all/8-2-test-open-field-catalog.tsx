import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { doOpenFceDlgAtom, hasRootFceAtoms, type FceDlgIn, type FceDlgOut } from "@/store";
import { Button } from "@/ui";
import { toast } from "sonner";

export function TestOpenFieldCatalog() {
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFceDlgAtom);

    const outDataAtom = useState(() => atom<FceDlgOut | null>(null))[0];

    const inData: FceDlgIn = {
        showTxt: true,
        showPsw: true,
        outBoxAtom: outDataAtom,
    };

    function onClick() {
        if (!hasRootFceAtoms()) {
            toast.error('Field Catalog is not available');
        } else {
            doOpenFieldCatalogDialog({ inData });
        }
    }

    return (
        <Button className="text-[.65rem]" onClick={onClick}>
            Field Catalog...
        </Button>
    );
}
