import { appSettings, doSetFilesFromDialogAtom, filesAtom } from "@/store";
import { Button, Checkbox, InputFileAsDlg, Label } from "@/ui";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { useSnapshot } from "valtio";

export function WelcomePage() {
    const files = useAtomValue(filesAtom);
    const showWelcome = useSnapshot(appSettings.appUi.uiGeneralState).showWelcome;

    if (!!files.length || !showWelcome) {
        return null;
    }

    return (
        <div className="relative h-full bg-muted-background flex flex-col items-center justify-center">
            <div className="text-2xl">
                Welcome to the app!
            </div>

            <OpenFileButton />

            <Label className="absolute left-0 bottom-0 p-4 flex items-center gap-1">
                <Checkbox
                    className="size-4"
                    checked={showWelcome}
                    onClick={() => appSettings.appUi.uiGeneralState.showWelcome = false}
                />
                Don't show this page next time
            </Label>
        </div>
    );
}

//TODO: add checkbox to hide welcome page next time
//TODO: more explanation about how start working with the app
//TODO: add menu to access the Welcome page
//TODO: add recent files list

function OpenFileButton() {
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
                }} />
        </Button>
    );
}