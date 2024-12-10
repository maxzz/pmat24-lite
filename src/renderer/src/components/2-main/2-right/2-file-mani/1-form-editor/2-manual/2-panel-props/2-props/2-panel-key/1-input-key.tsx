import { type PrimitiveAtom, useAtom } from "jotai";
import { type RowInputState } from "@/ui";
import { InputSelect } from "../8-props-ui";
import { actionKeys } from "@/store/manifest";

export function InputKey({ valueAtom, triggerClasses }: { valueAtom: PrimitiveAtom<RowInputState>; triggerClasses?: string; }) {
    const [value, setValue] = useAtom(valueAtom);
    return (
        <InputSelect
            items={actionKeys}
            placeholder="Select key"
            label="Key to press"
            labelClasses="min-w-[9ch]"
            triggerClasses={triggerClasses}
            value={value.data}
            onValueChange={(value) => setValue((prev) => ({ ...prev, data: value }))}
            title="Key for this action" />
    );
}
