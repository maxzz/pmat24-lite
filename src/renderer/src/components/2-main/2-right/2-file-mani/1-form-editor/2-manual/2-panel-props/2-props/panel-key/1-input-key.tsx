import { useSnapshot } from "valtio";
import { ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { ChunkKey } from "@/store/manifest";
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
