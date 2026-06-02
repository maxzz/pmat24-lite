import { type ChangeEvent, type ReactNode } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames, turnOffAutoComplete } from "@/utils";
import { IconClose, IconPaste, SymbolMatchString, SymbolMatchRegex } from "@ui/icons";
import { inputRingClasses } from "@/ui/local-ui";
import { Button } from "@/ui/shadcn/button";
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from "@/ui/shadcn/tooltip";
import { type FieldRowCtx } from "@/store/1-file-mani-atoms";
import { MatchModeDropdown } from "./3-col3-match-mode";

export function Case_ValueMatchedText({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, choosevalueAtom, labelAtom } = rowCtx;
    const label = useAtomValue(labelAtom);
    const [useIt, setUseIt] = useAtom(useItAtom);
    const [choosevalue, setChoosevalue] = useAtom(choosevalueAtom);

    const rawValue = choosevalue || '';
    const isRegex = rawValue.startsWith(regexPrefix);
    const displayValue = isRegex ? rawValue.substring(9) : rawValue;

    function enableRow() {
        if (!useIt) {
            setUseIt(true);
        }
    }

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        const value = isRegex ? `${regexPrefix}${newValue}` : newValue;
        setChoosevalue(value);
    }

    function handleModeSelect(mode: "string" | "regex") {
        const value = mode === "regex" ? `${regexPrefix}${displayValue}` : displayValue;
        setChoosevalue(value);
    }

    function clearMatchText() {
        enableRow();
        setChoosevalue(isRegex ? regexPrefix : "");
    }

    function pasteMatchText() {
        enableRow();
        setChoosevalue(isRegex ? `${regexPrefix}${label}` : label);
    }

    return (
        <div className={classNames(containerClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer")} onClick={!useIt ? enableRow : undefined}>
            <AnimatePresence initial={false}>
                {useIt && (
                    <motion.div
                        key="left-icon"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 26, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="col-start-1 overflow-hidden h-full border-r border-mani-border-muted bg-muted flex items-center justify-center select-none text-muted-foreground"
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center justify-center w-6.5 shrink-0">
                                    {isRegex ? <SymbolMatchRegex className="size-4" /> : <SymbolMatchString className="size-4" />}
                                </div>
                            </TooltipTrigger>
                            <TooltipPortal>
                                <TooltipContent className={matchModeTooltipContentClasses} sideOffset={10}>
                                    <MatchModeTooltipBody isRegex={isRegex} />
                                </TooltipContent>
                            </TooltipPortal>
                        </Tooltip>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="col-start-2 h-7 flex items-center min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                    {!useIt
                        ? (
                            <motion.div
                                key="label"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="px-2 truncate w-full"
                            >
                                {label}
                            </motion.div>
                        )
                        : (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="relative w-full h-full flex items-center"
                            >
                                <input
                                    className={classNames(inputClasses, "w-full", isRegex && "pr-14")}
                                    value={displayValue}
                                    onChange={handleTextChange}
                                    onClick={enableRow}
                                    onFocus={enableRow}
                                    placeholder={isRegex ? "Enter match regex..." : "Enter match text..."}
                                    {...turnOffAutoComplete}
                                />

                                <AnimatePresence initial={false}>
                                    {isRegex && (
                                        <motion.div
                                            key="regex-actions"
                                            initial={{ opacity: 0, x: 4 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 4 }}
                                            transition={{ duration: 0.15, ease: "easeInOut" }}
                                            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center"
                                        >
                                            <IconButtonWithTooltip label="Clear match text" onClick={clearMatchText}>
                                                <IconClose className="pt-0.5 size-4" />
                                            </IconButtonWithTooltip>

                                            <IconButtonWithTooltip label="Use original label" onClick={pasteMatchText}>
                                                <IconPaste className="pt-0.5 size-4" />
                                            </IconButtonWithTooltip>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
                {useIt && (
                    <motion.div
                        key="right-btn"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 28, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="col-start-3 overflow-hidden h-full flex items-stretch"
                    >
                        <div className="w-7 shrink-0 flex items-stretch">
                            <MatchModeDropdown isRegex={isRegex} onEnableRow={enableRow} onModeSelect={handleModeSelect} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function IconButtonWithTooltip({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode; }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    className="size-5 opacity-75 hover:opacity-100"
                    size="icon"
                    variant="ghost"
                    onClick={onClick}
                    aria-label={label}
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipPortal>
                <TooltipContent className={matchModeTooltipContentClasses} sideOffset={10}>
                    {label}
                </TooltipContent>
            </TooltipPortal>
        </Tooltip>
    );
}

const regexPrefix = "[m0]:2:2:";

const containerClasses = "\
h-7 grid grid-cols-[auto_minmax(0,1fr)_auto] 1origin-left \
bg-mani-background border-mani-border-muted border \
rounded overflow-hidden";

const inputClasses = "\
pl-1 pr-2 py-3 h-7 \
bg-mani-background text-mani-foreground \
truncate outline-hidden";

const matchModeTooltipContentClasses = "mx-4.5 py-2 max-w-80 text-xs text-foreground/75 bg-background border-border border shadow-sm";

function MatchModeTooltipBody({ isRegex }: { isRegex: boolean; }) {
    return isRegex
        ? (
            <div className="grid gap-1">
                <div>
                    This is regex matching. The following rules can be used:
                </div>

                <ul className="list-disc pl-4 grid gap-0.5">
                    <li><span className="font-medium">.</span> any character</li>
                    <li><span className="font-medium">*</span>, <span className="font-medium">+</span>, <span className="font-medium">?</span> repetitions</li>
                    <li><span className="font-medium">[]</span> character sets, <span className="font-medium">()</span> groups, <span className="font-medium">|</span> OR</li>
                    <li><span className="font-medium">^</span> start, <span className="font-medium">$</span> end</li>
                </ul>
            </div>
        )
        : (
            <div className="grid gap-1">
                This is string match to match the contents exactly (literal match).
            </div>
        );
}
