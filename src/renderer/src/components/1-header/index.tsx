import { useAtomValue, useSetAtom } from "jotai";
import { treeFilesAtom } from "@/store";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { DropdownMenuDemo } from "./1-main-menu";
import { Button } from "@/ui";
import { doOpenCreateDialogAtom, doOpenDrawerAtom } from "@/store/atoms/4-dialogs";

export function SectionHeader() {
    const treeFiles = useAtomValue(treeFilesAtom);

    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    const doOpenDrawer = useSetAtom(doOpenDrawerAtom);
    return (
        <div className="px-4 py-2 bg-muted/20 border-border/50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
                <DropdownMenuDemo />

                {treeFiles?.length > 0 && (
                    <div className="text-[.65rem] text-muted-foreground">
                        loaded{' '}
                        <span className="text-text/60">{treeFiles.length}</span>
                        {` file${treeFiles.length > 1 ? 's' : ''}`}
                    </div>
                )}

                <Button variant="outline" className="text-[.65rem]" onClick={()=> doOpenCreateDialog(true)}>
                    Create mani
                </Button>

                <Button variant="outline" className="text-[.65rem]" onClick={()=> doOpenDrawer(true)}>
                    Create
                </Button>
            </div>

            <ThemeSwitch />
        </div>
    );
}
