import { type MFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { ManualModeView } from "../2-manual";

export function ManualFormTabContent({ ctx }: {ctx: MFormContextProps}) {
    return (
        <ManualModeView ctx={ctx} />
    );
}
