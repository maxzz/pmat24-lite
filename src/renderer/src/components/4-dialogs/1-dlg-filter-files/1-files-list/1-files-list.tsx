import { useAtomValue } from "jotai";
import { treeFilesAtom } from "@/store";
import { ScrollArea } from "@/ui";

export function FilteredFilesList() {
    const files = useAtomValue(treeFilesAtom);
    return (
        <ScrollArea className="h-[50vh] max-h-[75vh]">
            <div>
                {files.map(
                    (file) => {
                        const IconToRender = file.icon;
                        return (
                            IconToRender && (
                                <div key={file.id} className="flex items-center gap-1 leading-5">
                                    <IconToRender className="flex-none p-px size-4" />
                                    <div className="truncate">{file.name}</div>
                                </div>
                            )
                        );
                    })
                }
            </div>
        </ScrollArea>
    );
}
