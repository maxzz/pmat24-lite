import { useSetAtom } from "jotai";
import { doDialogFilesAtom } from "@/store";

export function FileInputDlg({ openFolder, onChangeDone }: { openFolder?: boolean; onChangeDone?: () => void; }) {
    const doDialogFiles = useSetAtom(doDialogFilesAtom);
    const doDirOptions = { ...(openFolder && { webkitdirectory: '' }) };
    return (
        <input
            className="hidden"
            type="file"
            multiple
            accept=".dpm,.dpn"
            {...doDirOptions}
            onChange={(event) => {
                console.log('FileInputDlg onChange', event.target.files);
                
                event.target.files && doDialogFiles([...event.target.files]);
                onChangeDone?.();
            }}
        />
    );
}
