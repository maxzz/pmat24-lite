import { type ComponentPropsWithoutRef } from "react";
import { type MFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ManualModeView } from "../2-manual";

export function TabContent_ManualForm({ mFormctx, ...rest }: { mFormctx: MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    return (
        <ManualModeView mFormctx={mFormctx} {...rest} />
    );
}
