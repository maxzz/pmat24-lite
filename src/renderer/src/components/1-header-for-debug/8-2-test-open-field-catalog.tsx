import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, doOpenFceDlgAtom, hasRootFceAtoms, type FceDlgIn, type FceDlgOut } from "@/store";
import { Button } from "@/ui";
import { toast } from "sonner";

export function TestOpenFieldCatalog() {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFceDlgAtom);

    const outDataAtom = useState(() => atom<FceDlgOut | null>(null))[0];

    function onClick() {
        if (!hasRootFceAtoms()) {
            toast.warning((
                <div className="text-zinc-700">
                    The field catalog is not available until the folder is opened. Open the folder first.
                </div>
            ));
        } else {
            const inData: FceDlgIn = {
                openItemPickerDlg: false,
                showTxt: true,
                showPsw: true,
                outBoxAtom: outDataAtom,
            };
            doOpenFieldCatalogDialog({ inData });
        }
    }

    if (!fcAllowed) {
        return null;
    }

    return (
        <Button className="text-[.65rem]" onClick={onClick}>
            Field Catalog...
        </Button>
    );
}
