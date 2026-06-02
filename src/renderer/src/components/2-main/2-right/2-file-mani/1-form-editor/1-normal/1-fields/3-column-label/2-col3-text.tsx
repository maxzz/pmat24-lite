import { type ChangeEvent } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames, turnOffAutoComplete } from "@/utils";
import { SymbolMatchString, SymbolMatchRegex } from "@ui/icons";
import { inputRingClasses } from "@/ui/local-ui";
import { SelectTm } from "@/ui/local-ui/4-select-tm";
import { type FieldRowCtx } from "@/store/1-file-mani-atoms";

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

    return (
        <div
            className={classNames(
                containerClasses,
                inputRingClasses,
                !useIt && "opacity-30 cursor-pointer"
            )}
            onClick={!useIt ? enableRow : undefined}
        >
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
                        <div className="flex items-center justify-center w-6.5 shrink-0" title={isRegex ? "Matching as regex" : "Matching as string"}>
                            {isRegex ? <SymbolMatchRegex className="size-4" /> : <SymbolMatchString className="size-4" />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="col-start-2 h-7 flex items-center min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                    {!useIt ? (
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
                    ) : (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="w-full h-full flex items-center"
                        >
                            <input
                                className={classNames(inputClasses, "w-full")}
                                value={displayValue}
                                onChange={handleTextChange}
                                onClick={enableRow}
                                onFocus={enableRow}
                                placeholder={isRegex ? "Enter match regex..." : "Enter match text..."}
                                {...turnOffAutoComplete}
                            />
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

function MatchModeDropdown({ isRegex, onEnableRow, onModeSelect, }: { isRegex: boolean; onEnableRow: () => void; onModeSelect: (mode: "string" | "regex") => void; }) {
    const selectValue = isRegex ? "regex" : "string";

    return (
        <div title={isRegex ? "Matching as regex" : "Matching as string"} onClick={onEnableRow} className="1h-full 1w-full">
            <SelectTm
                items={matchModeItems}
                value={selectValue}
                onValueChange={(value) => {
                    if (value === "string" || value === "regex") {
                        onModeSelect(value);
                    }
                }}
                triggerClasses={classNames(
                    "1h-full 1w-full",
                    "border-0 rounded-none shadow-none",
                    "justify-center",
                    "[&>span]:hidden",
                    buttonClasses,
                )}
            />
        </div>
    );
}

const matchModeItems = [
    ["Match as string", "string"],
    ["Match as regex", "regex"],
] as const;

const regexPrefix = "[m0]:2:2:";

const containerClasses = "\
h-7 grid grid-cols-[auto_minmax(0,1fr)_auto] 1origin-left \
bg-mani-background border-mani-border-muted border \
rounded overflow-hidden";

const inputClasses = "\
pl-1 pr-2 py-3 h-7 \
bg-mani-background text-mani-foreground \
truncate outline-hidden";

const buttonClasses = "\
px-1.5 \
border-mani-border-separator border-l \
focus:rounded focus:outline-1 focus:-outline-offset-3 focus:outline-dashed \
outline-muted-foreground cursor-pointer";
