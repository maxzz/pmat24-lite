import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/ui/shadcn/select";

export type OptionValueObj<T extends object> = { key: string; } & T;
export type OptionValue<TKey extends object> = Prettify<string | OptionValueObj<TKey>>;
export type OptionTextValue2<TValue extends string | { key: string; } = string | { key: string; }> = Prettify<string | readonly [label: string, value: TValue]>;

export type StringValueChangeProps = {
    value: string;
    onValueChange: (value: string) => void;
};

type InputSelectUiProps =
    & {
        items: OptionTextValue2[];
        triggerClasses?: string;
        placeholder?: string;
    }
    & StringValueChangeProps;

const popupColorClasses = "\
h-6 \
text-primary-900 dark:text-primary-300 \
bg-primary-100 dark:bg-primary-900";

export function InputSelectUi<T>({ items, value, onValueChange, triggerClasses, placeholder }: InputSelectUiProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>

            <SelectTrigger className={triggerClasses}>
                <div className="truncate">
                    <SelectValue placeholder={placeholder} />
                </div>
            </SelectTrigger>

            <SelectContent align="start" buttonClasses={popupColorClasses} position="item-aligned">
                {items.map(
                    (item, idx) => {
                        const isString = typeof item === 'string';

                        const isSeparator = isString && item === '-';
                        if (isSeparator) {
                            return <SelectSeparator className="my-1 h-px bg-mani-border" key={idx} />;
                        }

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
