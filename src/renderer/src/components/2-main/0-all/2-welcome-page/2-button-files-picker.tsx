import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doSetFilesFromModernDialogAtom } from "@/store";
import { onClickToOpenFilesDialog } from "@/components/1-header/1-main-menu/10-file";

type ButtonFilesPickerProps = {
    openAsFolder?: boolean;
    className?: string;
};

export function ButtonFilesPicker({ openAsFolder, ...rest }: ButtonFilesPickerProps) {
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFromModernDialogAtom);
    return (
        <Button onClick={() => onClickToOpenFilesDialog(doSetFilesFromModernDialog, openAsFolder)} {...rest}>
            {openAsFolder ? 'Open Folder...' : 'Open Files... (temp for debuggins)'}
        </Button>
    );
}

//TODO: fix 1. when welcome is shown; 2. load files; 3. clear files; 4. welcome is shown as split screen
