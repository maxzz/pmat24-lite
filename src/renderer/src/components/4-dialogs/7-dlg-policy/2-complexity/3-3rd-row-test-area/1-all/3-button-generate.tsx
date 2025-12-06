import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui";
import { IconRadix_ChevronDown } from "@/ui/icons";
import { appSettings } from "@/store/9-ui-state";
import { type PolicyDlgTypes, doGeneratePswAtom, doGenNPasswordsAtom } from "../../../0-all";
import { ButtonGeneratedList } from "../7-generate-list-popup-dlg/1-all";

export function ButtonGenerate({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const nToGenerate = useSnapshot(appSettings).right.mani.nToGenerate;

    const openPopupGenNPasswordsAtom = useState(() => atom(false))[0];
    const doOpenPopupGenNPasswords = useSetAtom(openPopupGenNPasswordsAtom);

    const doGenNPasswords = useSetAtom(doGenNPasswordsAtom);
    const doGeneratePsw = useSetAtom(doGeneratePswAtom);

    function onGenerateOne() {
        doGeneratePsw({ dlgUiCtx: dlgUiCtx });
    }

    function onGenerateMany() {
        doGenNPasswords({ dlgUiCtx: dlgUiCtx });
        doOpenPopupGenNPasswords(true);
    }

    return (
        <div className="flex items-center">
            <Button className={localButtonClasses + " rounded-r-none border-r-0"} variant="outline" size="xs" title="Generate test password." onClick={onGenerateOne}>
                Generate
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={localButtonClasses + " rounded-l-none px-0.5 w-5"} variant="outline" size="xs" title="More options">
                        <IconRadix_ChevronDown className="size-3.5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onGenerateMany}>
                        generate {nToGenerate} passwords
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ButtonGeneratedList openAtom={openPopupGenNPasswordsAtom} />
        </div>
    );
}

const localButtonClasses = "px-1 active:scale-[.97]";
