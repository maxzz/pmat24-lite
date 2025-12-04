import { useState } from "react";
import { atom, useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { appSettings } from "@/store/9-ui-state";
import { type PolicyDlgTypes, doGeneratePswAtom, doGenNPasswordsAtom } from "../../../0-all";
import { ButtonGeneratedList } from "../7-generate-list-popup-dlg/1-all";
import { addRuleToHistory } from "../../3-2nd-row-custom-rule/6-btn-show-rules-history/2-button-rules-history";

export function ButtonGenerate({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const nToGenerate = useSnapshot(appSettings).right.mani.nToGenerate;

    const openPopupGenNPasswordsAtom = useState(() => atom(false))[0];
    const doOpenPopupGenNPasswords = useSetAtom(openPopupGenNPasswordsAtom);

    const doGenNPasswords = useSetAtom(doGenNPasswordsAtom);
    const doGeneratePsw = useSetAtom(doGeneratePswAtom);
    
    const isCustom = useAtomValue(dlgUiCtx.isCustomAtom);
    const custom = useAtomValue(dlgUiCtx.customAtom);

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (isCustom) {
            addRuleToHistory(custom);
        }

        if (e.ctrlKey) {
            doGenNPasswords({ dlgUiCtx: dlgUiCtx });
            doOpenPopupGenNPasswords(true);
        } else {
            doGeneratePsw({ dlgUiCtx: dlgUiCtx });
        }
    }

    return (
        <div>
            <Button className={localButtonClasses} variant="outline" size="xs" title={`Generate test password. Ctrl+Click to generate ${nToGenerate} passwords.`} onClick={onClick}>
                Generate
            </Button>

            <ButtonGeneratedList openAtom={openPopupGenNPasswordsAtom} />
        </div>
    );
}

const localButtonClasses = "px-1 active:scale-[.97]";
