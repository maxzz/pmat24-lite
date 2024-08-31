import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { ManualFields } from "../2-manual";

export function ManualFormTabContent({ ctx }: {ctx: MFormContextProps}) {
    return (<>
        <ManualFields ctx={ctx} />
    </>);
}
