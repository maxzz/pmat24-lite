import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { type PolicyDlgTypes, generateAtom, generateListAtom } from "../../0-all";
import { Button } from "@/ui";
import { ButtonGeneratedList } from "../7-generate-list/1-all";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";

const localButtonClasses = "active:scale-[.97]";

export function ButtonGenerate({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgTypes.PolicyUiAtoms; }) {
    const openGeneratedListAtom = useState(() => atom(false))[0];
    const generateList = useSetAtom(generateListAtom);
    const setOpenGeneratedList = useSetAtom(openGeneratedListAtom);
    const nToGenerate = useSnapshot(appSettings).right.mani.nToGenerate;
    const doGenerate = useSetAtom(generateAtom);
    return (
        <div>
            <Button
                className={localButtonClasses} variant="outline" size="sm" title={`Generate test password. Ctrl+Click to generate ${nToGenerate} passwords.`}
                onClick={(e) => {
                    if (e.ctrlKey) {
                        generateList({ dlgUiAtoms });
                        setOpenGeneratedList(true);
                    } else {
                        doGenerate({ dlgUiAtoms });
                    }
                }}
            >
                Generate
            </Button>

            <ButtonGeneratedList openAtom={openGeneratedListAtom} />
        </div>
    );
}
