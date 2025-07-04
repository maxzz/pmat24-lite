import type { ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { toNumberWDefault1, pluralWord } from "@/utils";
import { useAtomValue } from "jotai";
import { detailKbdClasses } from "./8-classes";

export function DetailsKbd({ item }: { item: ManualFieldState.CtxKbd; }) {

    const char = useAtomValue(item.charAtom).data;
    const repeat = toNumberWDefault1(useAtomValue(item.repeatAtom).data);

    return (
        <div className={containerClasses}>
            <div className={detailKbdClasses}>
                {char}
            </div>

            <div>
                {repeat}
                {pluralWord(repeat, 'time')}
            </div>
        </div>
    );
}

const containerClasses = "hidden @[300px]/actions:flex items-center justify-between space-x-1";

// Use sub-grid to align the key name to the left or not. It's okay for now.
// const containerClasses2 = "hidden @[300px]/actions:grid grid-cols-[1fr,auto] place-items-center justify-items-start space-x-1";
