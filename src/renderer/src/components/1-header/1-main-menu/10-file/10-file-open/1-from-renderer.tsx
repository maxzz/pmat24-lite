import { DropdownMenuItem_Files_FromRenderer } from "./2-files";
import { DropdownMenuItem_Folder_FromRenderer } from "./3-folders";

export function MenuItems_FileOpen_FromRenderer({ setMenuOpen }: { setMenuOpen: (v: boolean) => void; }) {
    return (<>
        <DropdownMenuItem_Files_FromRenderer setMenuOpen={setMenuOpen}>
            Open Files...
        </DropdownMenuItem_Files_FromRenderer>

        <DropdownMenuItem_Folder_FromRenderer setMenuOpen={setMenuOpen}>
            Open Folder...
        </DropdownMenuItem_Folder_FromRenderer>
    </>);
}
