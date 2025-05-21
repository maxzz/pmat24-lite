import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { type PolicyDlgTypes, generateAtom, generateListAtom } from "../../0-all";
import { Button } from "@/ui";
import { ButtonGeneratedList } from "./7-generate-list/1-all";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";

export function ButtonGenerate({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const openGeneratedListAtom = useState(() => atom(false))[0];
    const generateList = useSetAtom(generateListAtom);
    const setOpenGeneratedList = useSetAtom(openGeneratedListAtom);
    const nToGenerate = useSnapshot(appSettings).right.mani.nToGenerate;
    const doGenerate = useSetAtom(generateAtom);
    return (
        <div>
            <Button
                className={localButtonClasses} variant="outline" size="xs" title={`Generate test password. Ctrl+Click to generate ${nToGenerate} passwords.`}
                onClick={(e) => {
                    if (e.ctrlKey) {
                        generateList({ dlgUiCtx: dlgUiCtx });
                        setOpenGeneratedList(true);
                    } else {
                        doGenerate({ dlgUiCtx: dlgUiCtx });
                    }
                }}
            >
                Generate
            </Button>

            <ButtonGeneratedList openAtom={openGeneratedListAtom} />
        </div>
    );
}

const localButtonClasses = "px-1 active:scale-[.97]";
