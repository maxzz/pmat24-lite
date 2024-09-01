import { SVGProps } from "react";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { type ChunkKey } from "@/store/manifest";
import { DetailsKbd } from "./1-details-key";
import { DetailsFld } from "./2-details-fld";
import { DetailsDly } from "./3-details-dly";
import { DetailsPos } from "./4-details-pos";
import { IconField as IconFld, IconKey, IconPos, IconDelay as IconDly } from "@/ui/icons";

export function rowColumnName(type: ChunkKey): string {
    switch (type) {
        case 'kbd': return "Keystroke";
        case 'fld': return "Field";
        case 'dly': return "Delay";
        case 'pos': return "Position";
        default: {
            const really: never = type;
            return '';
        }
    }
}

export const chunkIconClasses = "ml-2 opacity-50 size-4";

export function RowColumnIcon({ type, className = chunkIconClasses }: { type: ChunkKey; } & SVGProps<SVGSVGElement>) {
    switch (type) {
        case 'kbd': return <IconKey className={className} />;
        case 'fld': return <IconFld className={className} />;
        case 'dly': return <IconDly className={className} />;
        case 'pos': return <IconPos className={className} />;
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
