import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { SymbolWarning } from "@/ui/icons";

export function MinMaxTrigger({ error, className }: HTMLAttributes<SVGSVGElement> & { error: string | undefined; }) {
    return (<>
        {error && (
            <SymbolWarning
                className={classNames("absolute right-0.5 top-2 transform -translate-y-1/2 size-3 text-red-500/90", className)}
            />
        )}
    </>);
}
