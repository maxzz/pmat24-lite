import { classNames } from "@/utils";
import { SymbolChevronDown, SymbolDot } from "@ui/icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function MatchModeDropdown({
    isRegex,
    onEnableRow,
    onModeSelect,
}: {
    isRegex: boolean;
    onEnableRow: () => void;
    onModeSelect: (mode: "string" | "regex") => void;
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    onClick={onEnableRow}
                    className={classNames(buttonClasses, "h-full w-full flex items-center justify-center")}
                    title={isRegex ? "Matching as regex" : "Matching as string"}
                >
                    <SymbolChevronDown className="size-4 border-muted-foreground rounded" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className={menuContentClasses} sideOffset={4} align="end">
                    <MenuItemMode label="Match as string" selected={!isRegex} onSelect={() => onModeSelect("string")} />
                    <MenuItemMode label="Match as regex" selected={isRegex} onSelect={() => onModeSelect("regex")} />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

function MenuItemMode({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void; }) {
    return (
        <DropdownMenu.Item className={classNames(menuItemClasses, selected && "bg-accent")} onSelect={onSelect}>
            {selected && <SymbolDot className="absolute left-1.5 size-5 fill-foreground" />}
            <span className="grow">{label}</span>
        </DropdownMenu.Item>
    );
}

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
