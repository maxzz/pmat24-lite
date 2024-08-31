import { useAtomValue } from "jotai";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { pluralWord, toNumberWDefault1 } from "@/utils";

export function InputRepeat({ item }: { item: ManualFieldState.KbdForAtoms; }) {
    const repeat = useAtomValue(item.repeatAtom);
    return (
        <div className="flex items-end space-x-1">
            <RowInputWLabel stateAtom={item.repeatAtom} label="Repeat" />

            <div className="pb-1">{`${pluralWord(toNumberWDefault1(repeat.data), 'time')}`}</div>
        </div>
    );
}
