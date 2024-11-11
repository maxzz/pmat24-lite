import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { doOpenFceDlgAtom, hasRootFceAtoms, type FceDlgIn, type FceDlgOut } from "@/store";
import { Button } from "@/ui";
import { toast } from "sonner";

export function TestOpenFieldCatalog() {
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFceDlgAtom);

    const outDataAtom = useState(() => atom<FceDlgOut | null>(null))[0];

    if (!hasRootFceAtoms()) {
        toast.error('Field Catalog is not available');
        return null;
    }

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
