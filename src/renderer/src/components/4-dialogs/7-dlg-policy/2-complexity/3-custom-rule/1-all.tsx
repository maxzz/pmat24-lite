import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type PolicyDlgTypes, updateExplanationAtom } from "../../0-all";
import { classNames, turnOffAutoComplete } from "@/utils";
import { Input } from "@/ui";
import { ButtonTestArea } from "./2-button-test-area";
import { AccordionSingle } from "./3-accordion";
import { TestAreaBody } from "../3-test-area/1-body";
import { ButtonRulesHelp } from "../4-help/1-all";
import { ButtonMenuAdd } from "../5-add-menu/1-all";
import { ButtonErrorInfo } from "../6-error-info";

function CustomRuleInput({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {

    const [custom, setCustom] = useAtom(dlgUiCtx.customAtom);
    const updateExplanation = useSetAtom(updateExplanationAtom);

    function onChange(value: string) {
        updateExplanation({ dlgUiCtx: dlgUiCtx, custom: value });
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

export function CustomRuleSection({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const isCustom = useAtomValue(dlgUiCtx.isCustomAtom);
    return (
        <div>
            <div className={classNames("flex items-center gap-2", !isCustom && "invisible pointer-events-none")}>
                <div className="w-full space-y-1">
                    <div className="">
                        Custom rule
                    </div>

                    <div className={classNames("relative h-8 flex items-center justify-between space-x-2")}>
                        <CustomRuleInput dlgUiCtx={dlgUiCtx} />

                        <div className="absolute right-1 flex items-center gap-1">
                            <ButtonErrorInfo dlgUiCtx={dlgUiCtx} />
                            <ButtonMenuAdd dlgUiCtx={dlgUiCtx} />
                            <ButtonRulesHelp />
                            <ButtonTestArea />
                        </div>
                    </div>
                </div>
            </div>

            {isCustom && (
                <AccordionSingle>
                    <TestAreaBody dlgUiCtx={dlgUiCtx} />
                </AccordionSingle>
            )}
        </div>
    );
}
