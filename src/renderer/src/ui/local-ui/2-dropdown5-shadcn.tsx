import { type HTMLAttributes, type ReactNode } from "react";
import * as Select from "@/ui/shadcn/select";
import { classNames } from "@/utils";
import { inputFocusClasses, inputRingClasses } from "@/ui/local-ui";

export type SelectNameValueItem = string | readonly [label: ReactNode, value: string];

type DropdownProps = HTMLAttributes<HTMLButtonElement> & {
    items: SelectNameValueItem[];
    valueAsLabel?: boolean; // each item value is the same as label, but label cannot be a ReactNode (only string) in this case
    value?: string;
    onValueChange?(value: string): void;
};

export function Dropdown5Shadcn({ items, valueAsLabel, value, onValueChange, className }: DropdownProps) {
    return (
        <Select.Select value={value} onValueChange={onValueChange}>
            <Select.SelectTrigger asChild>
                <div className={classNames(className)} tabIndex={0}>
                    <Select.SelectValue className={inputFocusClasses} />
                </div>
            </Select.SelectTrigger>

            <Select.SelectContent className="z-50">
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
                                <Select.SelectItem value={value} key={idx}>
                                    {label}
                                </Select.SelectItem>
                            );
                        }
                    )}
            </Select.SelectContent>

        </Select.Select>
    );
}
