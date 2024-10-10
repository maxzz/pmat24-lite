import { useRef } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom } from "@/store";
import { Button, InputFileAsDlg } from "@/ui";

export function OpenFileButton() {
    const doSetFilesFromDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    const ref = useRef<HTMLInputElement>(null);

    return (
        <Button className="mt-4" onClick={() => ref.current?.click()}>
            Open a files

            <InputFileAsDlg
                ref={ref}
                accept=".dpm,.dpn"
                openAsFolder={false}
                onChange={(event) => {
                    event.target.files && doSetFilesFromDialog([...event.target.files]);
                }}
            />
        </Button>
    );
}

//TODO: fix 1. welcome is shown; 2. load files; 3. clear files; 4. welcome is shown as split screen
