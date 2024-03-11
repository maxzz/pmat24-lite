import { ChangeEvent, MouseEvent } from "react";
import { useSetAtom } from "jotai";
import { doDialogFilesAtom } from "@/store";

type FileInputDlgProps = {
    openFolder?: boolean;
    onChangeDone?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: MouseEvent<HTMLInputElement>) => void;
};

export function FileInputDlg({ openFolder, onChangeDone, onClick }: FileInputDlgProps) {
    const doDialogFiles = useSetAtom(doDialogFilesAtom);
    const doDirOptions = { ...(openFolder && { webkitdirectory: '' }) };
    return (
        <input
            className="hidden"
            type="file"
            multiple
            accept=".dpm,.dpn"
            {...doDirOptions}
            onClick={(event) => {
                console.log('FileInputDlg onClick', event);
                onClick?.(event);
            }}
            onChange={(event) => {
                console.log('FileInputDlg onChange', event.target.files);
                
                event.target.files && doDialogFiles([...event.target.files]);
                onChangeDone?.(event);
            }}
        />
    );
}
