import { useAtomValue } from "jotai";
import { rightPanelAtom } from "@/store";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent } from "@/ui";
import { ManiTabsList } from "./3-mani-tabs-list";
import { FormEditor } from "../../1-form-editor";
import { createManiAtoms } from "../0-create-ui-atoms/0-all";
import { useEffect, useState } from "react";

export function ManiBody() {
    const { ref, width, height } = useResizeObserver();

    // const [fileUsAtoms, setFileUsAtoms] = useState()

    const fileUsAtom = useAtomValue(rightPanelAtom);
    if (!fileUsAtom) {
        return null;
    }

    const fileUs = useAtomValue(fileUsAtom);

    useEffect(() => {
        if (!fileUs.atoms) {
            console.log('-------------- ManiBody: createManiAtoms');

            fileUs.atoms = createManiAtoms(fileUs, fileUsAtom);
        }
    }, [fileUs, fileUsAtom]);

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
