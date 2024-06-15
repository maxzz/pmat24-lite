import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { PolicyDlgConv, generateAtom, generateListAtom } from "../../0-all";
import { Button } from "@/ui";
import { ButtonGeneratedList } from "../7-generate-list/1-all";
import { useSet } from "react-use";

const localButtonClasses = "active:scale-[.97]";

export function ButtonGenerate({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const openGeneratedListAtom = useState(() => atom(false))[0];
    const generateList = useSetAtom(generateListAtom);
    const setOpenGeneratedList = useSetAtom(openGeneratedListAtom);
    const doGenerate = useSetAtom(generateAtom);
    return (<div>
        <Button
            className={localButtonClasses} variant="outline" size="sm" title="Generate test password. Ctrl+Click to generate 50 passwords."
            onClick={(e) => {
                if (e.ctrlKey) {
                    console.log('ctrlKey is pressed');
                    generateList({ dlgUiAtoms });
                    setOpenGeneratedList(true);
                    return;
                }

                doGenerate({ dlgUiAtoms, prevPsw: '' });
            }}
        >
            Generate
        </Button>

        <ButtonGeneratedList openAtom={openGeneratedListAtom} />
    </div>);
}
