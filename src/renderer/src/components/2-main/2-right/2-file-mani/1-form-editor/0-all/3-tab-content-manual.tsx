import { type ComponentPropsWithoutRef } from "react";
import { type MFormProps } from "@/store/2-file-mani-atoms";
import { ManualModeView } from "../2-manual";
import { TooltipProvider } from "@/ui/shadcn/tooltip";

export function TabContent_ManualForm({ mFormProps, ...rest }: { mFormProps: MFormProps; } & ComponentPropsWithoutRef<'div'>) {
    return (
        <TooltipProvider>
            <ManualModeView mFormProps={mFormProps} {...rest} />
        </TooltipProvider>
    );
}
