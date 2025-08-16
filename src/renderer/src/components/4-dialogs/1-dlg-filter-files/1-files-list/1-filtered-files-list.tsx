import { useAtomValue } from "jotai";
import { ScrollArea } from "@/ui";
import { appSettings } from "@/store/9-ui-state";
import { getTreeItemDisplayText } from "@/store/store-utils/2-ui-utils";
import { type TreenIconComponent } from "@/ui/shadcn/tree";
import { type TreeFileItem, treeFilesAtom } from "@/store/5-tree-files";
import { castTreeItemToFileUs } from "@/components/2-main/1-left/2-files-list";

/**
 * This is used by filter dialog files list.
 */
export function FilteredFilesList() {
    const files = useAtomValue(treeFilesAtom);
    return (
        <ScrollArea className="h-[50vh] max-h-[75vh]">
            <div>
                {files.map(
                    (file) => <FilesFilterItem key={file.id} file={file} IconToRender={file.icon} />
                )}
            </div>
        </ScrollArea>
    );
}

function FilesFilterItem({ file, IconToRender }: { file: TreeFileItem; IconToRender: TreenIconComponent | undefined; }) {
    const fileUs = useAtomValue(castTreeItemToFileUs(file).fileUsAtom);
    const chooseName = useAtomValue(fileUs.parsedSrc.stats.loginFormChooseNameAtom);
    const displayText = getTreeItemDisplayText(fileUs, appSettings.files.itemsState, chooseName);

    return (<>
        {IconToRender && (
            <div key={file.id} className="flex items-center gap-1 leading-5">
                <IconToRender className="flex-none p-px size-4" />
                <div className="truncate">{displayText}</div>
            </div>
        )}
    </>);
}
