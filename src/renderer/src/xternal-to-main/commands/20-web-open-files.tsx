import { useSetAtom } from "jotai";
import { doDialogFilesAtom } from "@/store";

export function FileInputDlg({ openFolder, onChangeDone }: { openFolder?: boolean; onChangeDone?: () => void; }) {
    const doDialogFiles = useSetAtom(doDialogFilesAtom);
    const doDir = { ...(openFolder && { webkitdirectory: '' }) };
    return (
        <input className="hidden" type="file" multiple {...doDir}
            onChange={(event) => {
                event.target.files && doDialogFiles([...event.target.files]);
                onChangeDone?.();
            }}
        />
    );
}
