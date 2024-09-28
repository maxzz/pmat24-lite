import { ReactNode } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";

export type SelectNameValueItem = string | readonly [label: ReactNode, value: string];

export type StringValueChangeProps = {
    value: string;
    onValueChange: (value: string) => void;
};

type ExtPolicySelectUiProps = StringValueChangeProps & {
    items: SelectNameValueItem[];
};

const popupColorClasses = "\
h-6 \
bg-primary-100 dark:bg-primary-900 \
text-primary-900 dark:text-primary-300";

export function ExtPolicySelectUi({ items, value, onValueChange }: ExtPolicySelectUiProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>

            <SelectTrigger className="px-2 py-1 w-max h-7 text-xs gap-1">
                <SelectValue placeholder="No additional credential" />
            </SelectTrigger>

            <SelectContent align="start" buttonClasses={popupColorClasses} position="item-aligned">
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
