import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { hasMain, R2MCalls } from "@/xternal-to-main";
import { doSetFilesFrom_ModernDlg_Atom } from "@/store/0-serve-atoms/2-do-load-files";
import { onClickToOpenFilesDialog } from "@/components/2-main/1-left/1-header/1-menu-main/11-files";

type ButtonFilesPickerProps = {
    openAsFolder?: boolean;
    className?: string;
};

export function ButtonFilesPicker({ openAsFolder, ...rest }: ButtonFilesPickerProps) {
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFrom_ModernDlg_Atom);

    function onClick() {
        if (hasMain()) {
            R2MCalls.loadManifestsDialog({ openDirs: openAsFolder });
        } else {
            onClickToOpenFilesDialog(doSetFilesFromModernDialog, openAsFolder);
        }
    }

    return (
        <Button onClick={onClick} {...rest}>
            {openAsFolder ? 'Open Folder...' : 'Open Files... (advanced)'}
        </Button>
    );
}
