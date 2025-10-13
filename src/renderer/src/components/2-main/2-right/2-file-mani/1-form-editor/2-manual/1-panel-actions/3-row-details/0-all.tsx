import { type SVGProps } from "react";
import { classNames } from "@/utils";
import { type MFormProps, type ManualFieldState } from "@/store/2-file-mani-atoms";
import { type ChunkKey } from "@/store/manifest";
import { IconField as IconFld, IconKey, IconPos, IconDelay as IconDly } from "@/ui/icons";
import { DetailsKbd } from "./1-details-key";
import { DetailsFld } from "./2-details-fld";
import { DetailsDly } from "./3-details-dly";
import { DetailsPos } from "./4-details-pos";

export function rowColumnActionName(type: ChunkKey): string {
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
        case 'pos': return <IconPos className={classNames("!ml-1.5", className)} />;
        default: {
            const really: never = type;
            return null;
        }
    }
}

export function RowColumnDetails({ ctx, mFormProps }: { ctx: ManualFieldState.Ctx; mFormProps: MFormProps; }) {
    switch (ctx.type) {
        case 'kbd': return <DetailsKbd item={ctx} />;
        case 'fld': return <DetailsFld item={ctx} mFormProps={mFormProps} />;
        case 'dly': return <DetailsDly item={ctx} />;
        case 'pos': return <DetailsPos item={ctx} />;
        default: {
            const really: never = ctx;
            return null;
        }
    }
}
