import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { appSettings } from "@/store";
import { type PolicyDlgTypes, doGeneratePswAtom, doGenerateListAtom } from "../../0-all";
import { ButtonGeneratedList } from "./7-generate-list/1-all";

export function ButtonGenerate({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const nToGenerate = useSnapshot(appSettings).right.mani.nToGenerate;

    const openGeneratedListAtom = useState(() => atom(false))[0];
    const setOpenGeneratedList = useSetAtom(openGeneratedListAtom);

    const generateList = useSetAtom(doGenerateListAtom);
    const doGenerate = useSetAtom(doGeneratePswAtom);

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (e.ctrlKey) {
            generateList({ dlgUiCtx: dlgUiCtx });
            setOpenGeneratedList(true);
        } else {
            doGenerate({ dlgUiCtx: dlgUiCtx });
        }
    }

    return (
        <div>
            <Button className={localButtonClasses} variant="outline" size="xs" title={`Generate test password. Ctrl+Click to generate ${nToGenerate} passwords.`} onClick={onClick}>
                Generate
            </Button>

            <ButtonGeneratedList openAtom={openGeneratedListAtom} />
        </div>
    );
}

const localButtonClasses = "px-1 active:scale-[.97]";
