import { useSnapshot } from "valtio";
import { useSetAtom } from "jotai";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, ScrollArea } from "@/ui";
import { SymbolChevronDown, IconRadix_Cross2 } from "@/ui/icons";
import { classNames } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { inlineButtonClasses } from "../8-inline-styles";
import { type PolicyDlgTypes, doUpdateExplanationAtom } from "../../../0-all";

export function ButtonRulesHistory({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const { rulesHistory } = useSnapshot(appSettings.appUi);
    const updateExplanation = useSetAtom(doUpdateExplanationAtom);
    const setCustom = useSetAtom(dlgUiCtx.customAtom);

    const handleHistoryItemSelect = (rule: string) => {
        setCustom(rule);
        updateExplanation({ dlgUiCtx, custom: rule });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={classNames(inlineButtonClasses, "px-1 space-x-0.5")} size="xs" title="Rules history">
                    <SymbolChevronDown className="size-3" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-0! min-w-auto!" align="end">
                <ScrollArea className="py-1 max-h-[300px]">
                    {(!rulesHistory || rulesHistory.length === 0) && (
                        <div className="px-2 py-1 text-xs text-center text-muted-foreground">
                            No history
                        </div>
                    )}
                    {rulesHistory?.map(
                        (rule, idx) => (
                            <DropdownMenuItem
                                className="group text-xs font-mono flex items-center justify-between cursor-pointer"
                                onClick={() => handleHistoryItemSelect(rule)}
                                key={`${idx}-${rule}`}
                            >
                                <span className="mr-2 truncate">
                                    {rule}
                                </span>
                                <div
                                    className="p-0.5 opacity-0 group-hover:opacity-100 hover:text-red-500"
                                    onClick={(e) => removeRuleFromHistory(e, rule)}
                                    title="Remove from history"
                                    role="button"
                                    tabIndex={0}
                                >
                                    <IconRadix_Cross2 className="size-3" />
                                </div>
                            </DropdownMenuItem>
                        )
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const MAX_HISTORY = 10;

export function addRuleToHistory(rule: string) {
    if (!rule?.trim()) {
        return;
    }
    const history = appSettings.appUi.rulesHistory;
    const cleanRule = rule.trim();

    // Remove if exists
    const idx = history.indexOf(cleanRule);
    if (idx > -1) {
        history.splice(idx, 1);
    }

    // Add to top
    history.unshift(cleanRule);

    // Limit size
    if (history.length > MAX_HISTORY) {
        history.length = MAX_HISTORY;
    }
}

function removeRuleFromHistory(e: React.MouseEvent, rule: string) {
    e.stopPropagation();

    const history = appSettings.appUi.rulesHistory;
    const idx = history.indexOf(rule);
    if (idx > -1) {
        history.splice(idx, 1);
    }
}
