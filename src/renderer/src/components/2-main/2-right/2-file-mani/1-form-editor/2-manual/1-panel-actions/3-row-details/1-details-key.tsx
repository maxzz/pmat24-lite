import type { ManualFieldState } from "@/store/2-file-mani-atoms";
import { toNumberWDefault1, pluralWord } from "@/utils";
import { useAtomValue } from "jotai";
import { detailKbdClasses, hideBreakpointClasses } from "./8-classes";

export function DetailsKbd({ item }: { item: ManualFieldState.CtxKbd; }) {

    const char = useAtomValue(item.charAtom).data;
    const repeat = toNumberWDefault1(useAtomValue(item.repeatAtom).data);

    return (
        <div className={hideBreakpointClasses}>
            <div className={detailKbdClasses}>
                {char}
            </div>

            <div>
                {repeat}{' '}
                {pluralWord(repeat, 'time')}
            </div>
        </div>
    );
}

// Use sub-grid to align the key name to the left or not. It's okay for now.
// const containerClasses2 = "hidden @[300px]/actions:grid grid-cols-[1fr_auto] place-items-center justify-items-start space-x-1";
