import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "motion/react";
import { classNames, turnOffAutoComplete } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { Input } from "@/ui";
import { type PolicyDlgTypes, doUpdateExplanationAtom } from "../../../0-all";
import { ButtonErrorInfo } from "../2-btn-error-info";
import { ButtonMenuAddTemplatePart } from "../3-btn-add-menu-template-part/1-all";
import { TestAreaBody } from "../../3-3rd-row-test-area";
import { ButtonRulesHelp } from "../4-btn-explanation/1-all";
import { ButtonTestArea } from "../5-btn-show-test-area-trigger/2-button-test-area";
import { ButtonRulesHistory } from "../6-btn-show-rules-history/2-button-rules-history";

export function CustomRuleSection({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const isCustom = useAtomValue(dlgUiCtx.isCustomAtom);
    const isTestAreaOpen = useSnapshot(appSettings.right.mani).openTestArea;
    return (
        <div>
            <div className={classNames("flex items-center gap-2", !isCustom && "invisible pointer-events-none")}>
                <div className="w-full space-y-1">
                    <div>
                        Custom rule
                    </div>

                    <div className={classNames("relative h-7 flex items-center justify-between space-x-2")}>
                        <CustomRuleInput dlgUiCtx={dlgUiCtx} />

                        <div className="absolute right-1 flex items-center gap-0.5">
                            <ButtonErrorInfo dlgUiCtx={dlgUiCtx} />
                            <ButtonMenuAddTemplatePart dlgUiCtx={dlgUiCtx} />
                            {/* <ButtonRulesHelp /> */}
                            <ButtonRulesHelp />
                            <ButtonTestArea />
                            <ButtonRulesHistory dlgUiCtx={dlgUiCtx} />
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence initial={false}>
                {isCustom && isTestAreaOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <TestAreaBody dlgUiCtx={dlgUiCtx} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
//TODO: add custom rule history dropdown
//TODO: do something with Test Area button, now it does nothing
//TODO: combine buttons on '+' and '?' into dropdown menu or not?
//TODO: remove reserved height since now we have Test Area motion.

//TODO: for web app created with edge, we show warning as it was created with old version
//TODO: we show PM icon location for web apps, but did not save it, so it is allways default
//TODO: for PM icon location default we save '0', but should be empty string.

function CustomRuleInput({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {

    const [custom, setCustom] = useAtom(dlgUiCtx.customAtom);
    const updateExplanation = useSetAtom(doUpdateExplanationAtom);

    function onChange(value: string) {
        updateExplanation({ dlgUiCtx: dlgUiCtx, custom: value });
        setCustom(value);
    }

    return (
        <Input
            className="mr-0 pr-28 h-7 font-mono text-xs text-mani-foreground bg-mani-background border-mani-border-muted" // pr-28 = 24*4(buttons width) + 3*4(inbetween space) + 4(right border)
            value={custom}
            onChange={(e) => onChange(e.target.value)}
            {...turnOffAutoComplete}
        />
    );
}
