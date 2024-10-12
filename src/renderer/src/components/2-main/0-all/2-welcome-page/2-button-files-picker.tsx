import { HTMLAttributes, useRef } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom, doSetFilesFromModernDialogAtom, isFsSupported } from "@/store";
import { Button, InputFileAsDlg } from "@/ui";
import { hasMain } from "@/xternal-to-main";

type ButtonFilesPickerProps =
    & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>
    & {
        openAsFolder?: boolean;
    };

export function ButtonFilesPicker({ openAsFolder, className, ...rest }: ButtonFilesPickerProps) {
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFromModernDialogAtom);
    const isFirefoxWoFs = !isFsSupported(window);

    const ref = useRef<HTMLInputElement>(null);

    function onClick() {
        if (hasMain() || isFirefoxWoFs) {
            ref.current?.click();
        } else {
            doSetFilesFromModernDialog({ openFiles: !openAsFolder });
        }
    }

    return (
        <Button className="mt-4" onClick={onClick} {...rest}>
            {openAsFolder ? "Open Folder..." : "Open Files..."}

            <InputFileAsDlg
                ref={ref}
                accept=".dpm,.dpn" // ignored in folder mode
                openAsFolder={openAsFolder}
                onChange={(event) => doSetFilesFromLegacyDialog(event.target.files)}
            />
        </Button>
    );
}

//TODO: fix 1. welcome is shown; 2. load files; 3. clear files; 4. welcome is shown as split screen
