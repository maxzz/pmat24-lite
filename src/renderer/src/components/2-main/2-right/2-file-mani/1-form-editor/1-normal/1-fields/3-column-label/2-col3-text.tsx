import { type ChangeEvent } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames, turnOffAutoComplete } from "@/utils";
import { IconClose, IconPaste, SymbolChevronDown, SymbolDot, SymbolMatchString, SymbolMatchRegex } from "@ui/icons";
import * as M from "@radix-ui/react-dropdown-menu";
import { inputRingClasses } from "@/ui/local-ui";
import { Button } from "@/ui/shadcn/button";
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

    function clearMatchText() {
        enableRow();
        setChoosevalue(isRegex ? regexPrefix : "");
    }

    async function pasteMatchText() {
        enableRow();
        try {
            const text = await navigator.clipboard.readText();
            setChoosevalue(isRegex ? `${regexPrefix}${text}` : text);
        } catch {
            // ignore clipboard read errors (e.g. permissions)
        }
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
                            className="relative w-full h-full flex items-center"
                        >
                            <input
                                className={classNames(inputClasses, "w-full pr-14")}
                                value={displayValue}
                                onChange={handleTextChange}
                                onClick={enableRow}
                                onFocus={enableRow}
                                placeholder={isRegex ? "Enter match regex..." : "Enter match text..."}
                                {...turnOffAutoComplete}
                            />

                            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center">
                                <Button className="size-5 opacity-75 hover:opacity-100" size="icon" variant="ghost" onClick={clearMatchText} title="Clear match text">
                                    <IconClose className="pt-0.5 size-4" />
                                </Button>

                                <Button className="size-5 opacity-75 hover:opacity-100" size="icon" variant="ghost" onClick={() => void pasteMatchText()} title="Paste from clipboard">
                                    <IconPaste className="pt-0.5 size-4" />
                                </Button>
                            </div>
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
    return (
        <M.Root>
            <M.Trigger asChild>
                <button
                    onClick={onEnableRow}
                    className={classNames(buttonClasses, "h-full w-full flex items-center justify-center")}
                    title={isRegex ? "Matching as regex" : "Matching as string"}
                >
                    <SymbolChevronDown className="size-4 border-muted-foreground rounded" />
                </button>
            </M.Trigger>

            <M.Portal>
                <M.Content className={menuContentClasses} sideOffset={4} align="end">
                    <MenuItemMode label="Match as string" selected={!isRegex} onSelect={() => onModeSelect("string")} />
                    <MenuItemMode label="Match as regex" selected={isRegex} onSelect={() => onModeSelect("regex")} />
                </M.Content>
            </M.Portal>
        </M.Root>
    );
}

function MenuItemMode({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void; }) {
    return (
        <M.Item className={classNames(menuItemClasses, selected && "bg-accent")} onSelect={onSelect}>
            {selected && <SymbolDot className="absolute left-1.5 size-5 fill-foreground" />}
            <span className="grow">
                {label}
            </span>
        </M.Item>
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

const buttonClasses = "\
px-1.5 \
border-mani-border-separator border-l \
focus:rounded focus:outline-1 focus:-outline-offset-3 focus:outline-dashed \
outline-muted-foreground cursor-pointer";

const menuContentClasses = "\
py-1 max-h-[50vh] \
\
text-popover-foreground bg-popover border-mani-border border \
\
radix-side-top:animate-slide-up \
radix-side-bottom:animate-slide-down \
\
rounded-lg shadow-md \
overflow-auto smallscroll smallscroll-light \
\
grid grid-cols-1 z-51"; // dialog has z-index 50, so we need to be higher

const menuItemClasses = "\
relative mx-1 px-7 py-1.5 text-xs \
\
text-accent-foreground \
\
focus:text-accent-foreground \
focus:bg-accent \
\
rounded-md outline-hidden select-none cursor-default \
\
flex items-center";
