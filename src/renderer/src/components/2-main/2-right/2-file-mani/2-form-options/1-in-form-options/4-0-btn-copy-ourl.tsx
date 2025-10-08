import { useAtomValue } from "jotai";
import { IconCopy } from "@/ui/icons";
import { RowInputState } from "@/ui/local-ui/1-input-validate";

export function BtnCopyOurl({ ourlAtom }: { ourlAtom: PA<RowInputState>; }) {
    const ourl = useAtomValue(ourlAtom).data;

    return (<>
        {!!ourl && (
            <div className="absolute right-2 top-7 text-foreground">
                <IconCopy className="size-4" title="Copy original URL" onClick={() => navigator.clipboard.writeText(ourl)} />
            </div>
        )}
    </>);
}
