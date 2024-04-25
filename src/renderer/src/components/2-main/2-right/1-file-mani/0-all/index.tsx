import { useAtomValue } from "jotai";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui";
import { rightPanelSelectedContentAtom } from "@/store";
import { FormEditor } from "../1-form-editor";
import { useMemo } from "react";

export function Body_Mani() {
    const { ref, width, height } = useResizeObserver();

    const fileUs = useAtomValue(rightPanelSelectedContentAtom);
    if (!fileUs) {
        return null;
    }

    const hasCpass = fileUs.meta?.length === 2;
    
    return (
        <Tabs defaultValue="switch1" className="p-1 h-full flex flex-col">
            <TabsList className="self-start">
                <TabsTrigger value="switch1" className="text-xs">Login</TabsTrigger>
                <TabsTrigger value="switch2" className="text-xs">{`Password change${hasCpass ? '' : ': empty'}`}</TabsTrigger>
            </TabsList>

            <div className="flex-1 min-h-0 mt-1 p-2 pr-0 max-w-4xl rounded border-muted-foreground/20 border">
                <div className="h-full w-full overflow-hidden" ref={ref}>
                    <ScrollArea style={{ width, height }} horizontal fullheight>
                        <TabsContent value="switch1">
                            <FormEditor fileUs={fileUs} formIdx={0} />
                        </TabsContent>

                        <TabsContent value="switch2">
                            <FormEditor fileUs={fileUs} formIdx={1} />
                        </TabsContent>
                    </ScrollArea>
                </div>
            </div>
        </Tabs>
    );
}

//TODO: shared scroll area for both tabs is not good idea when tabs switching it will reset scroll position

//TODO: selecting input text and dragging it will clear all loaded files due to drag and drop gloabal event listener.
//      We need to check what is inside drag event and if it is text then prevent default

//TODO: preserve tab content when switching tabs
