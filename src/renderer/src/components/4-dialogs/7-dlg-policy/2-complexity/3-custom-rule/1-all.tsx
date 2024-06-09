import { useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { PolicyDlgConv, updateExplanationAtom } from "../../0-all";
import { classNames, turnOffAutoComplete } from "@/utils";
import { Input } from "@/ui";
import { ButtonTestArea } from "./2-button-test-area";
import { AccordionSingle } from "./3-accordion";
import { TestAreaBody } from "../3-test-area/1-body";
import { ButtonRulesHelp } from "../4-help/1-all";
import { ButtonMenuAdd } from "../5-add-menu/1-all";
import { ButtonErrorInfo } from "../6-error-info";

function CustomRuleInput({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const [custom, setCustom] = useAtom(dlgUiAtoms.customAtom);
    const updateExplanation = useSetAtom(updateExplanationAtom);

    function onChange(value: string) {
        updateExplanation({ dlgUiAtoms, value });
        setCustom(value);
    }

    return (
        <Input
            className="pr-28 h-8 font-mono text-xs text-mani-foreground bg-mani-background border-mani-border-muted"
            value={custom}
            onChange={(e) => onChange(e.target.value)}
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
                            <ButtonErrorInfo dlgUiAtoms={dlgUiAtoms} />
                            <ButtonMenuAdd dlgUiAtoms={dlgUiAtoms} />
                            <ButtonRulesHelp />
                            <ButtonTestArea isTestAreaOpenAtom={isTestAreaOpenAtom} />
                        </div>
                    </div>
                </div>
            </div>

            {isCustom && (
                <AccordionSingle isOpenAtom={isTestAreaOpenAtom}>
                    <TestAreaBody dlgUiAtoms={dlgUiAtoms} />
                </AccordionSingle>
            )}
        </div>
    );
}
