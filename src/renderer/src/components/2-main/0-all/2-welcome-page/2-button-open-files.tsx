import { useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom } from "@/store";
import { Button, InputFileAsDlg } from "@/ui";

export function OpenFileButton() {
    const [dlgOpen, setDlgOpen] = useState<boolean>(false);
    const doSetFilesFromDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    const onFiles = (files: File[]) => {
        doSetFilesFromDialog(files);
    };

    return (
        <Button className="mt-4" asChild>
            <label>
                Open a files
                <InputFileAsDlg
                    accept=".dpm,.dpn"
                    openFolder={false}
                    onClick={() => setDlgOpen(true)}
                    onChange={(event) => {
                        event.target.files && onFiles([...event.target.files]);
                    }}
                />
            </label>
        </Button>
    );
}

//TODO: fix 1. welcome is shown; 2. load files; 3. clear files; 4. welcome is shown as split screen
