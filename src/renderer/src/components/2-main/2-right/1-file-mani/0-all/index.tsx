import { useAtomValue } from "jotai";
import useResizeObserver from "use-resize-observer";
import { Button, ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui";
import { rightPanelSelectedContentAtom } from "@/store";
import { FormEditor } from "../1-form-editor";
import { useMemo, useState } from "react";
import { classNames } from "@/utils";

function ManiTabList({ hasCpass, hasChanges }: { hasCpass: boolean; hasChanges: boolean; }) {
    return (
        <div className="flex items-center justify-between">
            <TabsList>
                <TabsTrigger value="switch1" className="text-xs">Login</TabsTrigger>
                <TabsTrigger value="switch2" className="text-xs">{`${hasCpass ? 'Password change' : 'No password change'}`}</TabsTrigger>
            </TabsList>

            {hasChanges && (
                <Button>Save</Button>
            )}
        </div>
    );
}

export function Body_Mani_() {
    const { ref, width, height } = useResizeObserver();

    const fileUs = useAtomValue(rightPanelSelectedContentAtom);
    if (!fileUs) {
        return null;
    }

    const hasCpass = fileUs.meta?.length === 2;

    const [selectedTab, setSelectedTab] = useState('switch1');

    return (
        <Tabs defaultValue="switch1" className="p-1 h-full flex flex-col" value={selectedTab} onValueChange={setSelectedTab} >
            <ManiTabList hasCpass={hasCpass} hasChanges={false} />

            <div className="flex-1 min-h-0 mt-1 p-2 pr-0 max-w-4xl rounded border-muted-foreground/20 border">
                <div className="h-full w-full overflow-hidden" ref={ref}>
                    <ScrollArea style={{ width, height }} horizontal fullheight>

                        <div className={classNames(selectedTab !== "switch1" && "hidden")}>
                            <FormEditor fileUs={fileUs} formIdx={0} />
                        </div>

                        <div className={classNames(selectedTab !== "switch2" && "hidden")}>
                            <FormEditor fileUs={fileUs} formIdx={1} />
                        </div>

                    </ScrollArea>
                </div>
            </div>
        </Tabs>
    );
}

export function Body_Mani() {
    const { ref, width, height } = useResizeObserver();

    const fileUs = useAtomValue(rightPanelSelectedContentAtom);
    if (!fileUs) {
        return null;
    }

    const hasCpass = fileUs.meta?.length === 2;

    return (
        <Tabs defaultValue="switch1" className="p-1 h-full flex flex-col">
            <ManiTabList hasCpass={hasCpass} hasChanges={false} />

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
