import { ReactNode } from "react";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
// import { SrcriptItemFld, SrcriptItemPos, SrcriptItemDly, SrcriptItemKey, ScriptItem } from "@/store";
import { IconField as IconFld, IconKey, IconPos, IconDelay as IconDly } from "@/ui/icons";
import { pluralWord, toNumberWDefault1 } from "@/utils";
import { EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForOne, EditorDataForPos } from "@/store/manifest";
import { useAtomValue } from "jotai";

const detailKeyClasses = "\
px-1 py-px min-w-[1.5rem] text-[.55rem] leading-4 text-center \
\
bg-gradient-to-b from-primary-200/70 to-primary-300/20 dark:from-primary-700/70 dark:to-primary-600 \
\
border-primary-400 dark:border-primary-800 \
\
border rounded-sm \
shadow-sm dark:shadow-inner dark:shadow-primary-300/20";

const detailsFld = (item: EditorDataForFld) => 'TODO'; //`${item.id}`;
const detailsPos = (item: EditorDataForPos) => `${`x: ${item.x}, y: ${item.y}`}`;
const detailsDly = (item: EditorDataForDly) => `${item.n}`;
const detailsKey = (item: EditorDataForKbd) => (
    <div className="flex items-center space-x-1">
        <div className={detailKeyClasses}>
            {item.char}
        </div>
        <div>
            {item.repeat} {pluralWord(item.repeat, 'time')}
        </div>
    </div>
);

function DetailsFld({ item }: { item: ManualFieldState.FldForAtoms; }) {
    return (
        <div>
            TODO
        </div>
    );
}

function DetailsDly({ item }: { item: ManualFieldState.DlyForAtoms; }) {
    const n = useAtomValue(item.nAtom).data;
    return (
        <div>
            {n}
        </div>
    );
}

function DetailsPos({ item }: { item: ManualFieldState.PosForAtoms; }) {
    const x = useAtomValue(item.xAtom).data;
    const y = useAtomValue(item.yAtom).data;
    return (
        <div>
            x: {x}, y: {y}
        </div>
    );
}

function DetailsKbd({ item }: { item: ManualFieldState.KbdForAtoms; }) {
    const char = useAtomValue(item.charAtom).data;
    const repeat = toNumberWDefault1(useAtomValue(item.repeatAtom).data);
    return (
        <div className="flex items-center space-x-1">
            <div className={detailKeyClasses}>
                {char}
            </div>
            <div>
                {repeat} {pluralWord(repeat, 'time')}
            </div>
        </div>
    );
}

export function rowColumnDetails(item: EditorDataForOne): { name: string; icon: ReactNode; details: ReactNode; } {
    switch (item.type) {
        case 'fld': return { name: "Field"     /**/, icon: <IconFld className="ml-2 opacity-50 size-4" />,      /**/ details: detailsFld(item) };
        case 'kbd': return { name: "Keystroke" /**/, icon: <IconKey className="ml-2 opacity-50 size-4" />,      /**/ details: detailsKey(item) };
        case 'pos': return { name: "Position"  /**/, icon: <IconPos className="ml-2 opacity-50 size-4 mt-1" />, /**/ details: detailsPos(item) };
        case 'dly': return { name: "Delay"     /**/, icon: <IconDly className="ml-2 opacity-50 size-4" />,      /**/ details: detailsDly(item) };
        default: {
            const really: never = item;
            return { icon: null, name: '', details: '' };
        }
    }
}
