import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { SymbolWarning } from "@/ui/icons";

export function TooltipTrigger({ error, className }: HTMLAttributes<SVGSVGElement> & { error: string | undefined; }) {
    return (<>
        {error && (
            <SymbolWarning className={classNames("absolute mt-px mr-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500/90", className)} />
        )}
    </>);
}
