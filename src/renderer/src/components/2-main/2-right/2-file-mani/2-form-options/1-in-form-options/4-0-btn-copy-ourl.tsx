import { useAtomValue } from "jotai";
import { IconCopy } from "@/ui/icons";
import { RowInputState } from "@/ui/local-ui/1-input-validate";

export function BtnCopyOurl({ ourlAtom }: { ourlAtom: PA<RowInputState>; }) {
    const ourl = useAtomValue(ourlAtom).data;

    return (<>
        {!!ourl && (
            <IconCopy className="size-full" title="Copy original URL" onClick={() => navigator.clipboard.writeText(ourl)} />
        )}
    </>);
}
