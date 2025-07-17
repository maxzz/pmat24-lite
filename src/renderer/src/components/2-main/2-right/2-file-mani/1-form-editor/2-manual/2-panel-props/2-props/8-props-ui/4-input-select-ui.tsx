import { classNames } from "@/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";
import { type OptionTextValue } from "@/store/manifest";

export type StringValueChangeProps = {
    value: string;
    onValueChange: (value: string) => void;
};

type InputSelectUiProps = Prettify<
    & {
        items: OptionTextValue[];
        triggerClasses?: string;
        placeholder?: string;
    }
    & StringValueChangeProps
>;

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

const popupColorClasses = "\
h-6 \
bg-primary-100 dark:bg-primary-900 \
text-primary-900 dark:text-primary-300";

//const inputAsRefClasses = "text-[0.6rem] !text-blue-400 cursor-default";
