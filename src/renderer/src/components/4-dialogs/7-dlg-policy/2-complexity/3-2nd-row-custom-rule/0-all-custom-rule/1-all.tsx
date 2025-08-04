import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames, turnOffAutoComplete } from "@/utils";
import { Input } from "@/ui";
import { type PolicyDlgTypes, doUpdateExplanationAtom } from "../../../0-all";
import { ButtonErrorInfo } from "../2-btn-error-info";
import { ButtonMenuAddTemplatePart } from "../3-btn-add-menu-template-part/1-all";
import { TestAreaBody } from "../../3-3rd-row-test-area";
import { ButtonRulesHelp } from "../4-btn-explanation/1-all";
import { ButtonTestArea } from "../5-btn-show-test-area-trigger/2-button-test-area";
import { AccordionSingle } from "../3-accordion";

export function CustomRuleSection({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const isCustom = useAtomValue(dlgUiCtx.isCustomAtom);
    return (
        <div>
            <div className={classNames("flex items-center gap-2", !isCustom && "invisible pointer-events-none")}>
                <div className="w-full space-y-1">
                    <div>
                        Custom rule
                    </div>

                    <div className={classNames("relative h-7 flex items-center justify-between space-x-2")}>
                        <CustomRuleInput dlgUiCtx={dlgUiCtx} />

                        <div className="absolute right-0.5 flex items-center gap-0.5">
                            <ButtonErrorInfo dlgUiCtx={dlgUiCtx} />
                            <ButtonMenuAddTemplatePart dlgUiCtx={dlgUiCtx} />
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

function CustomRuleInput({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {

    const [custom, setCustom] = useAtom(dlgUiCtx.customAtom);
    const updateExplanation = useSetAtom(doUpdateExplanationAtom);

    function onChange(value: string) {
        updateExplanation({ dlgUiCtx: dlgUiCtx, custom: value });
        setCustom(value);
    }

    return (
        <Input
            className="pr-48 h-7 font-mono text-xs text-mani-foreground bg-mani-background border-mani-border-muted"
            value={custom}
            onChange={(e) => onChange(e.target.value)}
            {...turnOffAutoComplete}
        />
    );
}
