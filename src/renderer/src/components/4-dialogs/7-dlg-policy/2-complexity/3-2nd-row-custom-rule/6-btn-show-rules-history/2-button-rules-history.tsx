import { useSnapshot } from "valtio";
import { useSetAtom } from "jotai";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, ScrollArea } from "@/ui";
import { SymbolChevronDown, IconRadix_Cross2 } from "@/ui/icons";
import { classNames } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { inlineButtonClasses } from "../8-inline-styles";
import { type PolicyDlgTypes, doUpdateExplanationAtom } from "../../../0-all";

const MAX_HISTORY = 10;

export function addRuleToHistory(rule: string) {
    if (!rule?.trim()) return;
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

export function ButtonRulesHistory({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const { rulesHistory } = useSnapshot(appSettings.appUi);
    const updateExplanation = useSetAtom(doUpdateExplanationAtom);
    const setCustom = useSetAtom(dlgUiCtx.customAtom);

    const handleSelect = (rule: string) => {
        setCustom(rule);
        updateExplanation({ dlgUiCtx, custom: rule });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={classNames(inlineButtonClasses, "px-1 space-x-0.5")}
                    size="xs"
                    title="Rules history"
                >
                    <SymbolChevronDown className="size-3" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-0">
                <ScrollArea className="max-h-[300px] p-1">
                    {(!rulesHistory || rulesHistory.length === 0) && (
                        <div className="p-2 text-xs text-muted-foreground text-center">No history</div>
                    )}
                    {rulesHistory?.map((rule, idx) => (
                        <DropdownMenuItem 
                            key={`${idx}-${rule}`} 
                            onClick={() => handleSelect(rule)}
                            className="text-xs font-mono flex items-center justify-between group cursor-pointer"
                        >
                            <span className="truncate mr-2">{rule}</span>
                            <div 
                                role="button"
                                tabIndex={0}
                                className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 p-0.5 rounded-sm transition-all"
                                onClick={(e) => removeRuleFromHistory(e, rule)}
                                title="Remove from history"
                            >
                                <IconRadix_Cross2 className="size-3 text-muted-foreground hover:text-destructive" />
                            </div>
                        </DropdownMenuItem>
                    ))}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
