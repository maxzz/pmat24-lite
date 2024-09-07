import { type PrimitiveAtom, useAtom } from "jotai";
import { type RowInputState } from "@/ui";
import { InputSelect } from "../../8-manual-props-ui";
import { actionKeys } from "@/store/manifest";

export function InputKey({ valueAtom }: { valueAtom: PrimitiveAtom<RowInputState>; }) {
    const [value, setValue] = useAtom(valueAtom);
    return (
        <InputSelect
            items={actionKeys}
            label="Key"
            labelClasses="min-w-[9ch]"
            horizontal
            value={value.data}
            onValueChange={(value) => setValue((prev) => ({ ...prev, data: value }))}
            title="Key for this action" />
    );
}
