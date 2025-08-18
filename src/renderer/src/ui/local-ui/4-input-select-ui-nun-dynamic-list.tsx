import { useState } from "react";
import { classNames } from "@/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";
import { type OptionTextValue } from "@/store/manifest";

type StringValueChangeProps = {
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
    const [open, setOpen] = useState(false);
    const [listItems, setListItems] = useState(['1', '2', '3']);
    return (
        <Select value={value} onValueChange={onValueChange} open={open} onOpenChange={setOpen}>

            <SelectTrigger className={classNames("px-2 py-1 w-max h-7 text-xs gap-1", triggerClasses)}
                // onClick={(event) => {
                //     console.log('onClick ctrl:', event.ctrlKey);
                //     // setOpen(true);
                // }}
                onPointerDown={(event) => {
                    console.log('onPointerDown ctrl:', event.ctrlKey);
                    if (event.ctrlKey) {
                        setListItems(['4', '5', '6']);
                    } else {
                        setListItems(['1', '2', '3']);
                    }
                    
                    setOpen(true);
                }}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent align="start" buttonClasses={popupColorClasses} position="item-aligned">
                {/* {items.map( */}
                {listItems.map(
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
