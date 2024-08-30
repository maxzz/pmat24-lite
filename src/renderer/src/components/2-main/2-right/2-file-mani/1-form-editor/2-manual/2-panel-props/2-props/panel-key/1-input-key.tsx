import { useSnapshot } from "valtio";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { ChunkKey } from "@/store/manifest";
import { actionKeys } from "@/store/manifest";
import { InputSelect } from "../../ui";

export function InputKey({ item }: { item: ManualFieldState.DlyForAtoms; }) {
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
