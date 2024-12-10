import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";
import { type OptionTextValue } from "@/store/manifest";
import { classNames } from "@/utils";

export type StringValueChangeProps = {
    value: string;
    onValueChange: (value: string) => void;
};

export type OptionValueObj<T extends object> = { key: string; } & T;
export type OptionValue<TKey extends object> = Prettify<string | OptionValueObj<TKey>>;
export type OptionTextValue2<TValue = string | OptionValue<object>> = Prettify<string | readonly [label: string, value: TValue]>;

type InputSelectUiProps = StringValueChangeProps & {
    // items: OptionTextValue<string | OptionValue<{ na: string; }>>[];
    items: OptionTextValue2[];
    triggerClasses?: string;
    placeholder?: string;
};

const popupColorClasses = "\
h-6 \
bg-primary-100 dark:bg-primary-900 \
text-primary-900 dark:text-primary-300";

export function InputSelectUi({ items, value, onValueChange, triggerClasses, placeholder }: InputSelectUiProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>

            <SelectTrigger className={classNames("px-2 py-1 w-max h-7 text-xs gap-1", triggerClasses)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent align="start" buttonClasses={popupColorClasses} position="item-aligned">
                {items.map(
                    (item, idx) => {
                        const isString = typeof item === 'string';
                        const label = isString ? item : item[0];
                        const value = isString ? item : item[1];
                        const value2 = typeof value === 'string' ? value : value.key;
                        return (
                            <SelectItem className="text-xs" value={value2} indicatorFirst key={idx}>
                                {label}
                            </SelectItem>
                        );
                    })
                }
            </SelectContent>

        </Select>
    );
}