import { type HTMLAttributes, type ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import { SymbolChevronDown } from "@ui/icons";
import { CheckIcon } from "@radix-ui/react-icons";
import { classNames } from "@/utils";
import { inputFocusClasses, inputRingClasses } from "@/ui";

const viewportClasses = "\
px-1.5 py-1 \
\
text-popover-foreground bg-popover \
\
border-mani-border border \
\
radix-side-top:animate-slide-up \
radix-side-bottom:animate-slide-down \
\
rounded shadow-md \
grid grid-cols-1";

const selectItemClasses = "\
relative pl-8 pr-4 py-2 text-xs \
\
text-accent-foreground \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-highlighted:bg-primary-700 \
data-highlighted:text-primary-100 \
\
radix-disabled:opacity-50 \
\
rounded select-none cursor-default \
flex items-center";

const triggerClasses = "\
px-2 py-1 h-7 \
text-mani-foreground bg-mani-background border-mani-border-muted border \
flex items-center justify-between space-x-1 \
rounded";

export type SelectNameValueItem = string | readonly [label: ReactNode, value: string];

type DropdownProps = HTMLAttributes<HTMLButtonElement> & {
    items: SelectNameValueItem[];
    valueAsLabel?: boolean; // each item value is the same as label, but label cannot be a ReactNode (only string) in this case
    value?: string;
    onValueChange?(value: string): void;
};

export function Dropdown5({ items, valueAsLabel, value, onValueChange, className }: DropdownProps) {
    return (
        <Select.Root value={value} onValueChange={onValueChange}>
            <Select.Trigger asChild>
                <div className={classNames(triggerClasses, className)} tabIndex={0}>
                    <Select.Value className={inputFocusClasses} />

                    <Select.Icon>
                        <SymbolChevronDown className="size-4" />
                    </Select.Icon>
                </div>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="z-50">
                    <Select.Viewport className={viewportClasses}>
                        {items.map(
                            (item, idx) => {
                                const isString = typeof item === 'string';
                                const label = isString ? item : item[0];
                                const value = isString
                                    ? valueAsLabel && typeof label === 'string' //TODO: do this check at DropdownProps level, otherwise we fallback to idx silently
                                        ? label
                                        : idx.toString()
                                    : item[1];
                                return (
                                    <Select.Item className={selectItemClasses} value={value} key={idx}>
                                        <Select.ItemText>{label}</Select.ItemText>

                                        <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                            <CheckIcon />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                );
                            }
                        )}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>

        </Select.Root>
    );
}
