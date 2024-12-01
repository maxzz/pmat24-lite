import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import useResizeObserver from "use-resize-observer";
import { ScrollArea, Tabs, TabsContent } from "@/ui";
import { appSettings, rightPanelAtom } from "@/store";
import { FileUsAtom } from "@/store/store-types";
import { createManiAtoms } from "@/store/atoms/3-file-mani-atoms";
import { TabFormEditorGuard } from "../../1-form-editor";
import { TabFormOptions } from "../../2-form-options/0-all/0-all";
import { ManiTabsList } from "./2-mani-tabs-list";

function ManiBodyGuarded({ fileUsAtom }: { fileUsAtom: FileUsAtom; }) {
    const { ref, width, height } = useResizeObserver();
    const activeTab = useSnapshot(appSettings).right.mani.activeTab;

    const fileUs = useAtomValue(fileUsAtom);
    const [maniAtoms, setManiAtoms] = useAtom(fileUs.maniAtomsAtom);

    useEffect(
        () => {
            !maniAtoms && setManiAtoms((prev) => prev || createManiAtoms(fileUs, fileUsAtom));
        }, [maniAtoms, fileUs, fileUsAtom]
    );

    if (!maniAtoms) { // maniAtoms not ready yet but will be on the next render
        return null;
    }

    const hasCpass = fileUs.parsedSrc.meta?.length === 2;
    const hasChanges = false;

    return (
        <Tabs className="p-1 h-full flex flex-col" value={activeTab} onValueChange={(value) => appSettings.right.mani.activeTab = value}>
            <ManiTabsList hasCpass={hasCpass} hasChanges={hasChanges} />

            {/* <div className="flex-1 min-h-0 mt-1 p-2 pr-0 max-w-4xl rounded border-muted-foreground/20 border"> */}
                <div ref={ref} className="flex-1 min-h-0 mt-1 p-2 pr-0 max-w-4xl rounded border-muted-foreground/20 border     @container/tab-content h-full w-full overflow-hidden">
                    <ScrollArea style={{ width, height }} horizontal fullHeight>

                        <TabsContent value="options" tabIndex={-1}>
                            <TabFormOptions fileUs={fileUs} key={fileUsAtom.toString()} />
                        </TabsContent>

                        <TabsContent value="login" tabIndex={-1}>
                            <TabFormEditorGuard fileUs={fileUs} formIdx={0} />
                        </TabsContent>

                        <TabsContent value="cpass" tabIndex={-1}>
                            <TabFormEditorGuard fileUs={fileUs} formIdx={1} />
                        </TabsContent>

                    </ScrollArea>
                </div>
            {/* </div> */}
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
