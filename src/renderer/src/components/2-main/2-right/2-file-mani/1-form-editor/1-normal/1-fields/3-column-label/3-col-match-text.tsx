import { type ChangeEvent } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames, turnOffAutoComplete } from "@/utils";
import { SymbolChevronDown, SymbolDot, SymbolMatchString, SymbolMatchRegex } from "@ui/icons";
import * as M from "@radix-ui/react-dropdown-menu";
import { inputRingClasses } from "@/ui/local-ui";
import { type FieldRowCtx } from "@/store/2-file-mani-atoms";

/*
export function FieldRow({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, typeAtom, labelAtom, valueLifeAtom, policiesAtom, metaField } = rowCtx;
    const maniField = metaField.mani;
    const isTextField = maniField.type === 'text';

    const label = useAtomValue(labelAtom);
    const [useIt, setUseIt] = useAtom(useItAtom);

    const { showFormTextFields } = useSnapshot(appSettings.appUi.uiGeneral);

    if (!showFormTextFields && isTextField) {
        return null;
    }

    if (!isTextField) {
        return <FieldRow_normal rowCtx={rowCtx} fileUsCtx={fileUsCtx} />;
    }

    return (<>
        {useIt ? (
            <Case_ValueMatchedText rowCtx={rowCtx} />
        ) : (
            <div className="h-7">{label}</div>
        )}
    </>);
}
*/

/*
        {isTextField ? (
            useIt ? (
                <Case_ValueMatchedText rowCtx={rowCtx} />
            ) : (
                <div className="h-7">{label}</div>
            )
        ) : (
            <Column3_Label
                useItAtom={useItAtom}
                valueAtom={labelAtom}
                typeAtom={typeAtom}
                highlightCtx={{ nFieldCtx: rowCtx, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx }}
                onClick={enableRow}
            />
        )}

*/

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
        <AnimatePresence initial={false} mode="wait">
            {!useIt ? (
                <motion.div key="empty" className={classNames(containerClasses, "h-7 flex items-center")} transition={{ duration: 0.001 }}>
                    <div>{label}</div>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    className={classNames(containerClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer")}
                    initial={{ opacity: 0, scaleX: 0.1, transformOrigin: "left center" }}
                    animate={{ opacity: 1, scaleX: 1, transformOrigin: "left center" }}
                    exit={{ opacity: 0, scaleX: 0.1, transformOrigin: "left center" }}
                    transition={{ duration: .1, ease: "easeOut" }}
                >
                    <div className="pl-1 pr-1.5 text-muted-foreground bg-muted border-r select-none flex items-center justify-center" title={isRegex ? "Matching as regex" : "Matching as string"}>
                        {isRegex ? <SymbolMatchRegex className="size-4" /> : <SymbolMatchString className="size-4" />}
                    </div>

                    <input
                        className={inputClasses}
                        value={displayValue}
                        onChange={handleTextChange}
                        onClick={enableRow}
                        onFocus={enableRow}
                        placeholder={isRegex ? "Enter match regex..." : "Enter match text..."}
                        {...turnOffAutoComplete}
                    />

                    <M.Root>
                        <M.Trigger asChild>
                            <button onClick={enableRow} className={buttonClasses} title={isRegex ? "Matching as regex" : "Matching as string"}>
                                <SymbolChevronDown className="size-4 border-muted-foreground rounded" />
                            </button>
                        </M.Trigger>

                        <M.Portal>
                            <M.Content className={menuContentClasses} sideOffset={4} align="end" >
                                <MenuItemMode label="Match as string" selected={!isRegex} onSelect={() => handleModeSelect("string")} />
                                <MenuItemMode label="Match as regex" selected={isRegex} onSelect={() => handleModeSelect("regex")} />
                            </M.Content>
                        </M.Portal>
                    </M.Root>
                </motion.div>
            )}
        </AnimatePresence>
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
