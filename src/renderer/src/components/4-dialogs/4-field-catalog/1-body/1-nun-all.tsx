import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { fldCatTriggerAtom } from "@/store";
import { MiddleBody } from "./2-middle-body";
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

    const inData = useAtomValue(fldCatTriggerAtom);
    const needSelect = !!inData?.outBoxAtom;

    const selectedItemAtom = useState(() => atom<CatalogItem | null>(null))[0];
    const selectedItem = useAtomValue(selectedItemAtom);

    return (
        <div className={classNames(gridFrameClasses, "w-[540px]")}>
            <MiddleBody selectedItemAtom={selectedItemAtom} />

            <BottomButtons selectedItemAtom={selectedItemAtom} showSelectBtn={needSelect} />
        </div>
    );
}
