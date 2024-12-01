import { type PrimitiveAtom, useAtom } from "jotai";
import { type RowInputState } from "@/ui";
import { InputSelect } from "../8-props-ui";
import { actionKeys } from "@/store/manifest";

export function InputKey({ valueAtom }: { valueAtom: PrimitiveAtom<RowInputState>; }) {
    const [value, setValue] = useAtom(valueAtom);
    return (
        <InputSelect
            items={actionKeys}
            label="Key to press"
            labelClasses="min-w-[9ch]"
            value={value.data}
            onValueChange={(value) => setValue((prev) => ({ ...prev, data: value }))}
            title="Key for this action" />
    );
}
