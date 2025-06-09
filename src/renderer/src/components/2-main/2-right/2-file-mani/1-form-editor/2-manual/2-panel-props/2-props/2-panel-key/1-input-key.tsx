import { useAtom } from "jotai";
import { type RowInputStateAtom } from "@/ui";
import { InputLabel, InputSelect, InputSelectUi } from "../8-props-ui";
import { actionKeys } from "@/store/manifest";

export function InputKey({ valueAtom, triggerClasses }: { valueAtom: RowInputStateAtom; triggerClasses?: string; }) {
    const [value, setValue] = useAtom(valueAtom);
    return (
        <InputLabel label="Key to press" labelClasses="min-w-[9ch]" title="Key for this action">
            <InputSelectUi
                items={actionKeys}
                triggerClasses={triggerClasses}
                value={value.data}
                onValueChange={(value) => setValue((prev) => ({ ...prev, data: value }))}
                placeholder="Select key"
            />
        </InputLabel>

        // <InputSelect
        //     items={actionKeys}
        //     placeholder="Select key"

        //     label="Key to press"
        //     labelClasses="min-w-[9ch]"

        //     triggerClasses={triggerClasses}
        //     value={value.data}
        //     onValueChange={(value) => setValue((prev) => ({ ...prev, data: value }))}

        //     title="Key for this action"
        // />
    );
}

// export function InputSelect({ items, label, labelClasses, title, horizontal, ...rest }: InputSelectProps) {
//     return (
//         <InputLabel label={label} labelClasses={labelClasses} horizontal={horizontal} title={title}>
//             <InputSelectUi items={items} {...rest} />
//         </InputLabel>
//     );
// }

// export function InputKey({ valueAtom, triggerClasses }: { valueAtom: RowInputStateAtom; triggerClasses?: string; }) {
//     const [value, setValue] = useAtom(valueAtom);
//     return (
//         <InputSelect
//             items={actionKeys}
//             placeholder="Select key"
//             label="Key to press"
//             labelClasses="min-w-[9ch]"
//             triggerClasses={triggerClasses}
//             value={value.data}
//             onValueChange={(value) => setValue((prev) => ({ ...prev, data: value }))}
//             title="Key for this action"
//         />
//     );
// }
