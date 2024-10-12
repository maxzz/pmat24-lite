import { useSetAtom } from "jotai";
import { doSetFilesFromModernDialogAtom } from "@/store";
import { Button } from "@/ui/shadcn";
import { ButtonFilesPicker } from "@/components/2-main/0-all/2-welcome-page/2-button-files-picker";

export function TestOpenFiles() {
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFromModernDialogAtom);
    return (<>
        <ButtonFilesPicker />
        <ButtonFilesPicker openAsFolder />

        {/* <Button variant="outline" className="text-[.65rem]" onClick={() => doSetFilesFromModernDialog({ openFiles: true })}>
            Open files
        </Button>

        <Button variant="outline" className="text-[.65rem]" onClick={() => doSetFilesFromModernDialog({ openFiles: false })}>
            Open folder
        </Button> */}
    </>);
}
