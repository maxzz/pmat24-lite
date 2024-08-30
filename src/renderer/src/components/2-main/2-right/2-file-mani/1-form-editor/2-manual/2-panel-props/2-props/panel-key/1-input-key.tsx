import { useSnapshot } from "valtio";
import { SrcriptItemKey } from "@/store";
import { actionKeys } from "@/store/manifest";
import { InputSelect } from "../../ui";

export function InputKey({ item }: { item: SrcriptItemKey; }) {
    const snap = useSnapshot(item);
    return (
        <InputSelect
            items={actionKeys}
            label="Key"
            labelClasses="min-w-[9ch]"
            horizontal
            value={snap.char}
            onValueChange={(value) => item.char = value}
            title="Key for this action" />
    );
}
