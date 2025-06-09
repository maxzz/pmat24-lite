// import { ForwardedRef, ReactNode, forwardRef } from "react";
// import { IconCheck, IconChevronDown, IconChevronUp, IconDot } from "@/ui/icons";
// import * as S from "@radix-ui/react-select";
// import { focusClasses } from "../../8-shared-styles";
// import { classNames } from "@/utils";
// import { ModifierDisplayText } from "@/store/manifest";

// // const item1Classes = 'text-[13px] \
// // leading-none \
// // text-violet11 \
// // rounded-[3px] \
// // flex \
// // items-center \
// // h-[25px] \
// // pr-[35px] \
// // pl-[25px] \
// // relative \
// // select-none \
// // data-[disabled]:text-mauve8 \
// // data-[disabled]:pointer-events-none \
// // data-[highlighted]:outline-none \
// // data-[highlighted]:bg-violet9 \
// // data-[highlighted]:text-violet1';

// const popupColorClasses = "\
// bg-primary-100 dark:bg-primary-900 \
// text-primary-900 dark:text-primary-300";

// const itemClasses = "\
// data-[disabled]:opacity-50 \
// data-[disabled]:pointer-events-none \
//  \
// data-[highlighted]:text-primary-700 \
// data-[highlighted]:bg-primary-200 \
// data-[highlighted]:outline-primary-300 \
// data-[highlighted]:outline \
// data-[highlighted]:outline-1 \
//  \
// dark:data-[highlighted]:text-primary-50 \
// dark:data-[highlighted]:bg-primary-700 \
// dark:data-[highlighted]:outline-primary-600 \
// dark:data-[highlighted]:outline \
// dark:data-[highlighted]:outline-1 \
// \
// select-none";

// const Item = forwardRef(({ value, children }: { value: string; children: ReactNode; }, forwardRef: ForwardedRef<HTMLDivElement>) => {
//     return (
//         <S.Item className={classNames("rounded", itemClasses, popupColorClasses)} value={value} ref={forwardRef}>
//             <div className={classNames("relative h-6 pr-8 pl-6 py-2 flex items-center")}>
//                 <S.ItemText className="text-[.55rem] h-6">
//                     {children}
//                 </S.ItemText>

//                 <S.ItemIndicator className="absolute left-1">
//                     <IconCheck className="size-3" />
//                 </S.ItemIndicator>
//             </div>
//         </S.Item>
//     );
// });

// const triggerClasses = "w-full px-2 py-1 border-primary-400 dark:border-primary-700 border rounded flex items-center justify-between";
// const contentClasses = `text-xs ${popupColorClasses} border-primary-500 border rounded-md shadow shadow-primary-500/30 overflow-hidden select-none`;
// const scrollButtonClasses = `h-4 ${popupColorClasses} flex items-center justify-center`;

// export type StringValueChangeProps = {
//     value: string;
//     onValueChange: (value: string) => void;
// };

// type InputSelectUiProps = StringValueChangeProps & {
//     items: ModifierDisplayText[];
// };

// export function InputSelectUi2({ items, value, onValueChange }: InputSelectUiProps) {
//     return (
//         <S.Root value={value} onValueChange={onValueChange}>
//             <S.Trigger className={classNames(triggerClasses, focusClasses)}>
//                 <S.Value placeholder="select" />
//                 <S.Icon><IconChevronDown className="size-3" /> </S.Icon>
//             </S.Trigger>

//             <S.Portal>
//                 <S.Content className={contentClasses}>

//                     <S.ScrollUpButton className={scrollButtonClasses}>
//                         <IconChevronUp className="size-3" />
//                     </S.ScrollUpButton>

//                     <S.Viewport className="px-1 py-2">
//                         {items.map(
//                             (item) => {
//                                 const isString = typeof item === 'string';
//                                 const label = isString ? item : item[0];
//                                 const value = isString ? item : item[1];
//                                 return <Item value={value} key={value}>{label}</Item>;
//                             })
//                         }
//                     </S.Viewport>

//                     <S.ScrollDownButton className={scrollButtonClasses}>
//                         <IconChevronDown className="size-3" />
//                     </S.ScrollDownButton>

//                 </S.Content>
//             </S.Portal>
//         </S.Root>
//     );
// }

import { classNames } from "@/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";
import { type OptionTextValue } from "@/store/manifest";

export type StringValueChangeProps = {
    value: string;
    onValueChange: (value: string) => void;
};

type InputSelectUiProps = StringValueChangeProps & {
    items: OptionTextValue[];
    triggerClasses?: string;
    placeholder?: string;
};

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
