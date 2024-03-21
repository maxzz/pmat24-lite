import { treeFilesAtom } from "@/store";
import { ScrollArea } from "@/ui";
import { useAtomValue } from "jotai";

export function FilteredFilesList() {
    const files = useAtomValue(treeFilesAtom);
    return (
        <div>
            <div className="">Manifest list</div>
            <div >
                <ScrollArea className="max-h-[75vh] h-[50vh]">
                    {files.map((file) => (
                        <div key={file.id} className="">{file.name}</div>
                    ))
                    }
                </ScrollArea>
            </div>

        </div>
    );
}
