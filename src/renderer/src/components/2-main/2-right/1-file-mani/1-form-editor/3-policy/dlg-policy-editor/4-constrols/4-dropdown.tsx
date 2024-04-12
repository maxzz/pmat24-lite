import { HTMLAttributes } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import * as Select from '@radix-ui/react-select';
import { SymbolChevronDown } from "@ui/icons";
import { CheckIcon } from "@radix-ui/react-icons";

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

export function Dropdown({ items, valueAtom, className }: { items: string[]; valueAtom: PrimitiveAtom<string>; } & HTMLAttributes<HTMLButtonElement>) {
    const [val, setVal] = useAtom(valueAtom);
    return (
        <Select.Root value={val} onValueChange={(v: string) => setVal(v)}>
            <Select.Trigger className={className}>
                <div className="p-2 text-primary-300 bg-primary-700 flex items-center justify-between space-x-1 rounded">
                    <Select.Value />
                    <Select.Icon><SymbolChevronDown className="size-4" /></Select.Icon>
                </div>
            </Select.Trigger>

            <Select.Portal container={document.getElementById('portal')}>
                <Select.Content className="z-50">
                    <Select.Viewport className={viewportClasses}>
                        {items.map(
                            (item, idx) => (
                                <Select.Item className={selectItemClasses} value={`${idx}`} key={idx}>
                                    <Select.ItemText>{item}</Select.ItemText>

                                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))
                        }
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>

        </Select.Root>
    );
}
