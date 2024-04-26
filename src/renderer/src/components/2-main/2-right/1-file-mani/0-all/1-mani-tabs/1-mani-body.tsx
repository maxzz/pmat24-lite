import { useAtomValue } from "jotai";
import { FileUsAtomType } from "@/store/store-types";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent } from "@/ui";
import { ManiTabsList } from "./3-mani-tabs-list";
import { FormEditor } from "../../1-form-editor";

export function ManiBody({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const { ref, width, height } = useResizeObserver();

    const fileUs = useAtomValue(fileUsAtom);
    if (!fileUs) {
        return null;
    }

    const hasCpass = fileUs.meta?.length === 2;

    return (
        <Tabs defaultValue="switch1" className="p-1 h-full flex flex-col">
            <ManiTabsList hasCpass={hasCpass} hasChanges={false} />

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
