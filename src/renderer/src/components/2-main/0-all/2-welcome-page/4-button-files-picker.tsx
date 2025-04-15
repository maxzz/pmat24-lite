import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doSetFilesFrom_ModernDlg_Atom } from "@/store";
import { onClickToOpenFilesDialog } from "@/components/2-main/1-left/1-header/1-menu-main/11-files";

type ButtonFilesPickerProps = {
    openAsFolder?: boolean;
    className?: string;
};

export function ButtonFilesPicker({ openAsFolder, ...rest }: ButtonFilesPickerProps) {
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFrom_ModernDlg_Atom);

    function onClick() {
        onClickToOpenFilesDialog(doSetFilesFromModernDialog, openAsFolder)
    }

    return (
        <Button onClick={onClick} {...rest}>
            {openAsFolder ? 'Open Folder...' : 'Open Files... (advanced)'}
        </Button>
    );
}

//TODO: fix: 1. when welcome is shown; 2. load files; 3. clear files; 4. welcome is shown as split screen - done?
