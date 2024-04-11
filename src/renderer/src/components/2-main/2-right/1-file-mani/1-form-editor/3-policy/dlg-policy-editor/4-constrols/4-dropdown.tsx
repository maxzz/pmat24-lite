import { HTMLAttributes } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import * as Select from '@radix-ui/react-select';
import { classNames } from '@/utils';
import { SymbolChevronDown } from "@ui/icons";
import { CheckIcon } from "@radix-ui/react-icons";


export function Dropdown({ items, valueAtom, className }: { items: string[]; valueAtom: PrimitiveAtom<string>; } & HTMLAttributes<HTMLButtonElement>) {
    const [val, setVal] = useAtom(valueAtom);
    return (
        <Select.Root value={val} onValueChange={(v: string) => setVal(v)}>
            <Select.Trigger className={className}>
                <div className="p-2 flex items-center justify-between space-x-1 text-primary-300 bg-primary-700 rounded">
                    <Select.Value />
                    <Select.Icon><SymbolChevronDown className="size-4" /></Select.Icon>
                </div>
            </Select.Trigger>

            <Select.Portal container={document.getElementById('portal')}>
                <Select.Content>
                    <Select.Viewport className={classNames(
                        "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                        "px-1.5 py-1 grid grid-cols-1 rounded shadow-md",
                        "bg-primary-100 dark:bg-gray-800 rounded"
                    )}
                    >
                        {items.map((item, idx) => (
                            <Select.Item className={classNames(
                                "relative pl-8 pr-4 py-2 text-xs flex items-center cursor-default select-none rounded outline-none",
                                "text-primary-700 data-highlighted:bg-primary-700 data-highlighted:text-primary-100",
                                "focus:bg-primary-100",
                                "radix-disabled:opacity-50",
                                "focus:outline-none select-none"
                            )}
                                value={`${idx}`}
                                key={idx}
                            >
                                <Select.ItemText>{item}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                    <CheckIcon />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>

        </Select.Root>
    );
}
