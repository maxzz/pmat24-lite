import { useAtom, useAtomValue } from "jotai";
import { rightPanelAtom } from "@/store";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent } from "@/ui";
import { ManiTabsList } from "./3-mani-tabs-list";
import { FormEditor } from "../../1-form-editor";
import { createManiAtoms } from "@/store/atoms/3-file-mani-atoms/0-all";
import { useEffect } from "react";
import { FileUsAtom } from "@/store/store-types";

function ManiBodyGuarded({ fileUsAtom }: { fileUsAtom: FileUsAtom; }) {
    const { ref, width, height } = useResizeObserver();

    const fileUs = useAtomValue(fileUsAtom);
    const [fileUsAtoms, setFileUsAtoms] = useAtom(fileUs.atomsAtom);

    useEffect(() => {
        !fileUsAtoms && setFileUsAtoms(createManiAtoms(fileUs, fileUsAtom));
    }, [fileUs, fileUsAtom, fileUsAtoms]);

    if (!fileUsAtoms) { // atoms not ready yet but will be on the next render
        return null;
    }

    const hasCpass = fileUs.meta?.length === 2;
    const hasChanges = false;

    return (
        <Tabs defaultValue="switch1" className="p-1 h-full flex flex-col">
            <ManiTabsList hasCpass={hasCpass} hasChanges={hasChanges} />

            <div className="flex-1 min-h-0 mt-1 p-2 pr-0 max-w-4xl rounded border-muted-foreground/20 border">
                <div className="h-full w-full overflow-hidden" ref={ref}>
                    <ScrollArea style={{ width, height }} horizontal fullheight>

                        <TabsContent value="switch0">
                            <div className="">Not yet</div>
                        </TabsContent>

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

export function ManiBody() {
    const fileUsAtom = useAtomValue(rightPanelAtom);
    if (!fileUsAtom) {
        return null;
    }
    return (
        <ManiBodyGuarded fileUsAtom={fileUsAtom} />
    );
}
