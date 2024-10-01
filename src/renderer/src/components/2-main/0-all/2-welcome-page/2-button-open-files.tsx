import { doSetFilesFromDialogAtom } from "@/store";
import { Button, InputFileAsDlg } from "@/ui";
import { useSetAtom } from "jotai";
import { useState } from "react";

export function OpenFileButton() {
    const [fileDlgOpen, setFileDlgOpen] = useState<boolean>(false);
    const doSetFilesFromDialog = useSetAtom(doSetFilesFromDialogAtom);

    const onFiles = (files: File[]) => {
        doSetFilesFromDialog(files);
    };

    return (
        <Button className="mt-4">
            Open a file
            <InputFileAsDlg
                accept=".dpm,.dpn"
                openFolder={false}
                onClick={() => setFileDlgOpen(true)}
                onChange={(event) => {
                    event.target.files && onFiles([...event.target.files]);
                }}
            />
        </Button>
    );
}
