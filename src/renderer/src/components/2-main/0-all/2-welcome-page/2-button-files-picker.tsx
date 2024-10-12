import { type ChangeEvent, useRef } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom, doSetFilesFromModernDialogAtom, isFsSupported } from "@/store";
import { Button, InputFileAsDlg } from "@/ui";
import { hasMain } from "@/xternal-to-main";
import { IdOpenFiles, IdOpenFolders } from "@/components/1-header/1-main-menu/10-file";

type ButtonFilesPickerProps = {
    className?: string;
    openAsFolder?: boolean;
};

export function ButtonFilesPicker({ openAsFolder, ...rest }: ButtonFilesPickerProps) {
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFromModernDialogAtom);
    const id = openAsFolder ? IdOpenFolders : IdOpenFiles;
    const isFirefoxWoFs = !isFsSupported(window);

    // const ref = useRef<HTMLInputElement>(null);

    function onClickToOpen() {
        if (hasMain() || isFirefoxWoFs) {
            document.getElementById(id)?.click();
        } else {
            doSetFilesFromModernDialog({ openFiles: !openAsFolder });
        }
    }

    // function onChange(event: ChangeEvent<HTMLInputElement>) {
    //     doSetFilesFromLegacyDialog(event.target.files);

    //     // clear the input value to allow the same folder to be opened again
    //     const input = document.getElementById(id) as HTMLInputElement;
    //     input && (input.value = '');
    // }

    return (
        <Button onClick={onClickToOpen} {...rest}>
            {openAsFolder ? "Open Folder..." : "Open Files..."}

            {/* <InputFileAsDlg
                ref={ref}
                accept=".dpm,.dpn" // ignored in folder mode
                openAsFolder={openAsFolder}
                onChange={(event) => doSetFilesFromLegacyDialog(event.target.files)}
            /> */}
        </Button>
    );
}

//TODO: fix 1. welcome is shown; 2. load files; 3. clear files; 4. welcome is shown as split screen
