import { useAtom } from "jotai";
import { type RowInputStateAtom } from "@/ui";
import { InputLabel } from "../8-props-ui";
import { InputSelectUi } from "@/ui";
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
    );
}
