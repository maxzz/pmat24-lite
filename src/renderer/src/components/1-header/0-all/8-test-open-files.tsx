import { useSetAtom } from "jotai";
import { doSetFilesFromModernDialogAtom } from "@/store";
import { Button } from "@/ui/shadcn";

export function TestOpenFiles() {
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFromModernDialogAtom);
    return (<>
        <Button variant="outline" className="text-[.65rem]" onClick={() => doSetFilesFromModernDialog()}>
            Open files
        </Button>

        <Button variant="outline" className="text-[.65rem]" onClick={() => doSetFilesFromModernDialog()}>
            Open folder
        </Button>
    </>);
}
