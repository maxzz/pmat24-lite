import { useEffect } from "react";
import { type Atom, useAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { useResizeObserver } from "@/utils";
import { ScrollArea, Tabs, TabsContent } from "@/ui";
import { appSettings } from "@/store/9-ui-state";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";
import { maniTabValue, rightPanelAtomAtom, setManiActiveTab } from "@/store/5-3-right-panel";
import { createManiAtoms } from "@/store/0-serve-atoms/0-create/0-create-mani-ctx-atoms";
import { ManiEditorFormSelector } from "../../1-form-editor";
import { ManiEditorAllOptions } from "../../2-form-options";
import { ManiTabsList } from "./2-mani-tabs-list";

export function ManiBody() {
    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    if (!fileUsAtom) {
        return null;
    }
    return (
        <ManiBodyGuarded fileUsAtom={fileUsAtom} />
    );
}

function ManiBodyGuarded({ fileUsAtom }: { fileUsAtom: FileUsAtom; }) {
    const { ref, width, height } = useResizeObserver();
    const activeTab = useSnapshot(appSettings).right.mani.activeTab;

    const fileUs = useAtomValue(fileUsAtom);
    const [maniAtoms, setManiAtoms] = useAtom(fileUs.maniAtomsAtom);

    useEffect(
        () => {
            !maniAtoms && setManiAtoms((prev) => prev || createManiAtoms({ fileUs, fileUsAtom }));
        }, [maniAtoms, fileUs, fileUsAtom]
    );

    //printManiBodyFileUsAtom(fileUsAtom, fileUs);

    if (!maniAtoms) { // console.log('maniAtoms not ready yet but will be on the next render');
        return null;
    }

    const hasCpass = fileUs.parsedSrc.meta?.length === 2;
    const hasChanges = false;

    return (
        <Tabs className="p-1 pr-0 h-full flex flex-col" value={activeTab} onValueChange={(value) => setManiActiveTab(value as ManiTabValue)}>
            <ManiTabsList hasCpass={hasCpass} hasChanges={hasChanges} />

            <div ref={ref} className={refClasses}>
                <ScrollArea style={{ width, height }} horizontal fullHeight>

                    <TabsContent value={maniTabValue.options} tabIndex={-1}>
                        <ManiEditorAllOptions fileUs={fileUs} /* key={fileUsAtom.toString()} */ />
                    </TabsContent>

                    <TabsContent value={maniTabValue.login} tabIndex={-1}>
                        <ManiEditorFormSelector className="mr-0.5 pr-4 h-full" fileUs={fileUs} formIdx={0} />
                    </TabsContent>

                    <TabsContent value={maniTabValue.cpass} tabIndex={-1}>
                        <ManiEditorFormSelector className="mr-0.5 pr-4 h-full" fileUs={fileUs} formIdx={1} />
                    </TabsContent>

                </ScrollArea>
            </div>
        </Tabs>
    );
}

const refClasses = "\
@container/tab-content \
\
flex-1 mt-1 size-full min-h-0 max-w-4xl \
overflow-hidden";
// border-muted-foreground/20 border rounded \

export function printManiBodyFileUsAtom(fileUsAtom: Atom<FileUs | undefined>, fileUs: FileUs | undefined, suffix?: string) {
    const fileUsStr = fileUsAtom?.toString() || 'null';
    console.groupCollapsed(`%c💎 ----------- ManiBody.Render: fileUsAtom:%c${fileUsStr} %c${suffix || ''}`,
        fileUsAtom ? 'font-weight: normal; color: green' : 'font-weight: normal; color: red',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray; font-size: 0.6rem',
        // { fileUs }
    );
    console.trace();
    console.groupEnd();
}
