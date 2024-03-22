import { treeFilesAtom } from "@/store";
import { ScrollArea } from "@/ui";
import { SymbolDot } from "@/ui/icons";
import { useAtomValue } from "jotai";

export function FilteredFilesList() {
    const files = useAtomValue(treeFilesAtom);
    return (
        <div>
            {/* <div className="">Manifests</div> */}

            <ScrollArea className="h-[50vh] max-h-[75vh]">
                <div className="grid grid-cols-[1fr_auto]">
                    <div className="">
                        {files.map((file) => {
                            const IconToRender = file.icon;
                            return (
                                IconToRender && (
                                    <div key={file.id} className="flex items-center gap-1 leading-5">
                                        <IconToRender className="p-px size-4" />
                                        {file.name}
                                    </div>
                                )
                            );
                        })}
                    </div>

                    <div className="">
                        Options
                        <PopupContent />
                    </div>
                </div>
            </ScrollArea>

        </div>
    );
}

const popupContentDotClasses = "w-3 h-3 inline fill-none stroke-black";
const popupContentTextClasses = "inline-block font-bold font-mono tracking-tight w-8";

export function PopupContent() {
    return (
        <div className="text-sm py-1 px-1">
            <div className="font-bold">Search (Ctrl+D)</div>
            <div className="pb-1">Use the search prefix to dispay only:</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>win:</span> logins for Windows apps</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>web:</span> logins for web apps</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>why:</span> logins with problems to check why</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>cap:</span> logins with window caption</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>cls:</span> logins with window classname</div>
        </div>
    );
}
