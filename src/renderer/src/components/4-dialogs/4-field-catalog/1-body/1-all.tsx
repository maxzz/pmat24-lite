import { useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { closeFldCatDialogAtom, fldCatTriggerAtom } from "@/store";
import { DialogHeader } from "@/components/2-main/2-right/2-file-manifest/3-tab-policy/dlg-policy-editor/3-sections";
import { Header } from "./2-header";
import { MiddleBody } from "./3-middle-body";
import { BottomButtons } from "./5-bottom-buttons";
import { classNames } from "@/utils";

const gridFrameClasses = "\
p-4 text-sm \
\
text-primary-400 bg-primary-800 \
border-primary-600/20 \
shadow-primary-700/30 \
\
border rounded shadow \
flex flex-col space-y-4";

export function FldCatDlgBody() {
    const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);

    const inData = useAtomValue(fldCatTriggerAtom);
    const needSelect = !!inData?.outBoxAtom;

    const selectedItemAtom = useState(() => atom<CatalogItem | null>(null))[0];
    const selectedItem = useAtomValue(selectedItemAtom);

    return (
        <div className={classNames(gridFrameClasses, "w-[540px]")}>
            {/* <DialogHeader header="Field Catalog" /> */}
            {/* <DialogHeader header={<SubTitle />} /> */}
            <DialogHeader header={<Header />} />

            <MiddleBody selectedItemAtom={selectedItemAtom} closeDlg={closeFldCatDialog} />

            <BottomButtons selectedItemAtom={selectedItemAtom} needSelect={needSelect} />
        </div>
    );
}
