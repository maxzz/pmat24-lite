import { useAtom } from "jotai";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { InputSelect } from "../../8-ui";
import { actionKeys } from "@/store/manifest";

export function InputKey({ item }: { item: ManualFieldState.KbdForAtoms; }) {
    const [value, setValue] = useAtom(item.charAtom);
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
