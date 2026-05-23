import { type ChangeEvent } from "react";
import { useAtom } from "jotai";
import { classNames, turnOffAutoComplete } from "@/utils";
import { SymbolChevronDown, SymbolDot, SymbolMatchString, SymbolMatchRegex } from "@ui/icons";
import * as M from "@radix-ui/react-dropdown-menu";
import { inputRingClasses } from "@/ui/local-ui";
import { type FieldRowCtx } from "@/store/2-file-mani-atoms";

export function Case_ValueMatchedText({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, valueLifeAtom } = rowCtx;
    const [useIt, setUseIt] = useAtom(useItAtom);
    const [valueLife, setValueLife] = useAtom(valueLifeAtom);

    const enableRow = () => {
        if (!useIt) {
            setUseIt(true);
        }
    };

    const rawValue = valueLife.value || '';
    const isRegex = rawValue.startsWith("[m0]:1:");
    const displayValue = isRegex ? rawValue.substring(7) : rawValue;

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const value = isRegex ? `[m0]:1:${newValue}` : newValue;
        setValueLife((v) => ({ ...v, value, isRef: false, isNon: false, }));
    };

    const handleModeSelect = (mode: "string" | "regex") => {
        enableRow();
        const value = mode === "regex" ? `[m0]:1:${displayValue}` : displayValue;
        setValueLife((v) => ({ ...v, value, isRef: false, isNon: false, }));
    };

    if (!useIt) {
        return <div></div>;
    }

    return (
        <div className={classNames(containerClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer")}>
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
        </div>
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

const containerClasses = "\
h-7 grid grid-cols-[auto_minmax(0,1fr)_auto] \
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
