import { ReactNode } from "react";
import { useAtomValue } from "jotai";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { IconField as IconFld, IconKey, IconPos, IconDelay as IconDly } from "@/ui/icons";
import { pluralWord, toNumberWDefault1 } from "@/utils";
import { ChunkKey, FieldTyp } from "@/store/manifest";

const detailKeyClasses = "\
px-1 py-px min-w-[1.5rem] text-[.55rem] leading-4 text-center \
\
bg-gradient-to-b from-primary-50/50 to-primary-100/50 dark:from-primary-800/50 dark:to-primary-700/50 \
\
border-primary-300 dark:border-primary-500 \
\
border rounded-sm \
shadow-sm dark:shadow-inner dark:shadow-primary-400/20";

function DetailsKbd({ item }: { item: ManualFieldState.KbdForAtoms; }) {
    const char = useAtomValue(item.charAtom).data;
    const repeat = toNumberWDefault1(useAtomValue(item.repeatAtom).data);
    return (
        <div className="hidden @[300px]/actions:flex items-center justify-between space-x-1">
            <div>
                {repeat} {pluralWord(repeat, 'time')}
            </div>
            <div className={detailKeyClasses}>
                {char}
            </div>
        </div>
    );
}

function DetailsFld({ item }: { item: ManualFieldState.FldForAtoms; }) {
    const name = useAtomValue(item.field.labelAtom) || 'Field';
    const type = useAtomValue(item.field.typeAtom) === FieldTyp.psw ? 'Password' : 'Text';
    return (
        <div className="hidden @[300px]/actions:flex items-center justify-between">
            {name}
            <span className={detailKeyClasses}>
                {type}
            </span>
        </div>
    );
}

function DetailsDly({ item }: { item: ManualFieldState.DlyForAtoms; }) {
    const n = useAtomValue(item.nAtom).data;
    return (
        <div className="hidden @[300px]/actions:block">
            {n} ms
        </div>
    );
}

function DetailsPos({ item }: { item: ManualFieldState.PosForAtoms; }) {
    const x = useAtomValue(item.xAtom).data;
    const y = useAtomValue(item.yAtom).data;
    return (
        <div className="hidden @[300px]/actions:block">
            x: {x}, y: {y}
        </div>
    );
}

export function rowColumnName(type: ChunkKey): string {
    switch (type) {
        case 'kbd': return "Keystroke";
        case 'fld': return "Field";
        case 'dly': return "Delay";
        case 'pos': return "Position";
        default: {
            return '';
        }
    }
}

export function RowColumnIcon({ type }: { type: ChunkKey; }) {
    switch (type) {
        case 'kbd': return <IconKey className="ml-2 opacity-50 size-4" />;
        case 'fld': return <IconFld className="ml-2 opacity-50 size-4" />;
        case 'dly': return <IconDly className="ml-2 opacity-50 size-4" />;
        case 'pos': return <IconPos className="ml-2 opacity-50 size-4 mt-1" />;
        default: {
            const really: never = type;
            return null;
        }
    }
}

export function RowColumnDetails({ item }: { item: ManualFieldState.ForAtoms; }) {
    switch (item.type) {
        case 'kbd': return <DetailsKbd item={item} />;
        case 'fld': return <DetailsFld item={item} />;
        case 'dly': return <DetailsDly item={item} />;
        case 'pos': return <DetailsPos item={item} />;
        default: {
            const really: never = item;
            return null;
        }
    }
}
