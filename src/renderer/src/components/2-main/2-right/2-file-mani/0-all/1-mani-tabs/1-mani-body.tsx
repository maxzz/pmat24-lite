import { useAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, rightPanelAtom } from "@/store";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent } from "@/ui";
import { ManiTabsList } from "./3-mani-tabs-list";
import { FormEditor } from "../../1-form-editor";
import { createManiAtoms } from "@/store/atoms/3-file-mani-atoms/0-all";
import { useEffect } from "react";
import { FileUsAtom } from "@/store/store-types";
import { TabFormOptions } from "../../2-form-options/0-all/0-all";

function ManiBodyGuarded({ fileUsAtom }: { fileUsAtom: FileUsAtom; }) {
    const { ref, width, height } = useResizeObserver();

    const fileUs = useAtomValue(fileUsAtom);
    const [maniAtoms, setManiAtoms] = useAtom(fileUs.maniAtomsAtom);

    const activeTab = useSnapshot(appSettings).right.mani.activeTab;

    useEffect(() => { !maniAtoms && setManiAtoms((prev) => prev || createManiAtoms(fileUs, fileUsAtom)); }, [maniAtoms, fileUs, fileUsAtom]);

    if (!maniAtoms) { // maniAtoms not ready yet but will be on the next render
        return null;
    }

    const hasCpass = fileUs.meta?.length === 2;
    const hasChanges = false;

    return (
        <Tabs className="p-1 h-full flex flex-col" value={activeTab} onValueChange={(value) => appSettings.right.mani.activeTab = value}>
            <ManiTabsList hasCpass={hasCpass} hasChanges={hasChanges} />

            <div className="flex-1 min-h-0 mt-1 p-2 pr-0 max-w-4xl rounded border-muted-foreground/20 border">
                <div className="h-full w-full overflow-hidden" ref={ref}>
                    <ScrollArea style={{ width, height }} horizontal fullHeight>

                        <TabsContent value="options" tabIndex={-1}>
                            <TabFormOptions fileUs={fileUs} key={fileUsAtom.toString()} />
                        </TabsContent>

                        <TabsContent value="login" tabIndex={-1}>
                            <FormEditor fileUs={fileUs} formIdx={0} />
                        </TabsContent>

                        <TabsContent value="cpass" tabIndex={-1}>
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
