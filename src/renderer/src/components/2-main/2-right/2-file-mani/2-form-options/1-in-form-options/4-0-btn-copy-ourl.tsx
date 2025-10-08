import { useAtomValue } from "jotai";
import { IconCopy } from "@/ui/icons";
import { OFormProps } from "@/store/2-file-mani-atoms/9-types";

export function BtnCopyOurl({ oFormProps }: { oFormProps: OFormProps; }) {
    const { p2Detect: { ourlAtom } } = oFormProps.oAllAtoms.options;
    const ourl = useAtomValue(ourlAtom).data;

    return (<>
        {!!ourl && (
            <IconCopy className="size-full" title="Copy original URL" onClick={() => navigator.clipboard.writeText(ourl)} />
        )}
    </>);
}
