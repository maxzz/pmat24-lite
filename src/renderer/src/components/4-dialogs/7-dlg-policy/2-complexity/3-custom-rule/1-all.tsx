import { useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { PolicyDlgConv } from "../../0-all/0-conv";
import { classNames, turnOffAutoComplete } from "@/utils";
import { Input } from "@/ui";
import { TestRoomAccordion } from "./3-test-area-accordion";
import { ButtonRulesHelp } from "../4-help/1-all";
import { ButtonTestArea } from "./2-button-test-area";
import { TestAreaBody } from "../3-test-area/1-body";

function CustomRuleInput({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [custom, setCustom] = useAtom(dlgUiAtoms.customAtom);
    return (
        <Input
            className="h-8 font-mono text-xs text-mani-foreground bg-mani-background border-mani-border-muted"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            {...turnOffAutoComplete}
        />
    );
}

export function CustomRuleSection({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const isCustom = useAtomValue(dlgUiAtoms.isCustomAtom);
    const isTestAreaOpenAtom = useState(() => atom<string[]>([]))[0];

    return (
        <div>
            <div className={classNames("flex items-center gap-2", !isCustom && "invisible pointer-events-none")}>
                <div className="w-full space-y-1">
                    <div className="">
                        Custom rule
                    </div>

                    <div className={classNames("relative h-8 flex items-center justify-between space-x-2")}>
                        <CustomRuleInput dlgUiAtoms={dlgUiAtoms} />

                        <div className="absolute right-1 flex items-center gap-1">
                            <ButtonRulesHelp />
                            <ButtonTestArea isTestAreaOpenAtom={isTestAreaOpenAtom} />
                        </div>
                    </div>
                </div>
            </div>

            {isCustom && (
                <TestRoomAccordion isTestAreaOpenAtom={isTestAreaOpenAtom}>
                    <TestAreaBody dlgUiAtoms={dlgUiAtoms} />
                </TestRoomAccordion>
            )}
        </div>
    );
}
