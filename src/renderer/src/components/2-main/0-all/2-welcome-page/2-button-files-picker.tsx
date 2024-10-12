import { useSetAtom } from "jotai";
import { doSetFilesFromModernDialogAtom, isFsSupported } from "@/store";
import { Button } from "@/ui";
import { hasMain } from "@/xternal-to-main";
import { IdOpenFiles, IdOpenFolders, onClickToOpenFilesDialog } from "@/components/1-header/1-main-menu/10-file";

type ButtonFilesPickerProps = {
    className?: string;
    openAsFolder?: boolean;
};

export function ButtonFilesPicker({ openAsFolder, ...rest }: ButtonFilesPickerProps) {
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFromModernDialogAtom);

    // const isFirefoxWoFs = !isFsSupported(window);
    // const id = openAsFolder ? IdOpenFolders : IdOpenFiles;

    // function onClickToOpen() {
    //     if (hasMain() || isFirefoxWoFs) {
    //         document.getElementById(id)?.click();
    //     } else {
    //         doSetFilesFromModernDialog({ openAsFolder: !!openAsFolder });
    //     }
    // }

    return (
        <Button onClick={() => onClickToOpenFilesDialog(doSetFilesFromModernDialog, openAsFolder)} {...rest}>
            {openAsFolder ? "Open Folder..." : "Open Files..."}
        </Button>
    );
}

//TODO: fix 1. when welcome is shown; 2. load files; 3. clear files; 4. welcome is shown as split screen
