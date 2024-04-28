import { useAtomValue } from "jotai";
import { treeFilesAtom } from "@/store";
import { ScrollArea } from "@/ui";
import { FilterOptions } from "./4-filter-options";

export function FilteredFilesList() {
    const files = useAtomValue(treeFilesAtom);
    return (
        <div className="grid grid-cols-[1fr_auto] gap-4">

            <ScrollArea className="h-[50vh] max-h-[75vh]">
                <div>
                    {files.map((file) => {
                        const IconToRender = file.icon;
                        return (
                            IconToRender && (
                                <div key={file.id} className="flex items-center gap-1 leading-5">
                                    <IconToRender className="flex-none p-px size-4" />
                                    <div className="">{file.name}</div>
                                </div>
                            )
                        );
                    })}
                </div>
            </ScrollArea>

            <FilterOptions />
        </div>
    );
}
