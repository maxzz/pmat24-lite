import { type ReactNode } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";

export type SelectNameValueItem = string | readonly [label: ReactNode, value: string];

export type StringValueChangeProps = {
    value: string;
    onValueChange: (value: string) => void;
};

type ExtPolicySelectUiProps = StringValueChangeProps & {
    items: SelectNameValueItem[];
    placeholder?: string;
};

export function ExtPolicySelectUi({ items, placeholder, value, onValueChange }: ExtPolicySelectUiProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>

            <SelectTrigger className="px-2 py-1 w-max h-7 text-xs gap-1">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent align="start" buttonClasses={popupContentClasses} position="item-aligned">
                {items.map(
                    (item, idx) => {
                        const isString = typeof item === 'string';
                        const label = isString ? item : item[0];
                        const value = isString ? item : item[1];
                        return (
                            <SelectItem className="text-xs" value={value} indicatorFirst key={idx}>
                                {label}
                            </SelectItem>
                        );
                    })
                }
            </SelectContent>

        </Select>
    );
}

const popupContentClasses = "\
h-6 \
text-primary-900 dark:text-primary-300 \
bg-primary-100 dark:bg-primary-900";
