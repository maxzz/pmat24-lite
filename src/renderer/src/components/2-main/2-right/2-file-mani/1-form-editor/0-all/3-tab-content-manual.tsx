import { type ComponentPropsWithoutRef } from "react";
import { type MFormProps } from "@/store/1-file-mani-atoms";
import { ManualModeView } from "../2-manual";

export function TabContent_ManualForm({ mFormProps, ...rest }: { mFormProps: MFormProps; } & ComponentPropsWithoutRef<'div'>) {
    return (
        <ManualModeView mFormProps={mFormProps} {...rest} />
    );
}
