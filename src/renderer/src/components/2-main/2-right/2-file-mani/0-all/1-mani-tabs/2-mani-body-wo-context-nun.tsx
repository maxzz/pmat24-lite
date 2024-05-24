import { useState } from "react";
import { useAtomValue } from "jotai";
import useResizeObserver from "use-resize-observer";
import { rightPanelContentAtom } from "@/store";
import { ScrollArea, Tabs } from "@/ui";
import { classNames } from "@/utils";
import { ManiTabsList } from "./3-mani-tabs-list";
import { FormEditor } from "../../1-form-editor";

export function ManiBodyWoContextNun() {
    const { ref, width, height } = useResizeObserver();

    const fileUs = useAtomValue(rightPanelContentAtom);
    if (!fileUs) {
        return null;
    }

    const hasCpass = fileUs.meta?.length === 2;

    const [selectedTab, setSelectedTab] = useState('switch1');

    return (
        <Tabs defaultValue="switch1" className="p-1 h-full flex flex-col" value={selectedTab} onValueChange={setSelectedTab}>
            <ManiTabsList hasCpass={hasCpass} hasChanges={false} />

            <div className="flex-1 min-h-0 mt-1 p-2 pr-0 max-w-4xl rounded border-muted-foreground/20 border">
                <div className="h-full w-full overflow-hidden" ref={ref}>
                    <ScrollArea style={{ width, height }} horizontal fullHeight>

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
