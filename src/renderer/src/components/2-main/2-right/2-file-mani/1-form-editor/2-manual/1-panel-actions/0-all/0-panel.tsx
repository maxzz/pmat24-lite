import { type HTMLAttributes, useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { classNames, delay } from "@/utils";
import { ScrollArea } from "@/ui";
import { type ChunkKey } from "@/store/manifest";
import { type MFormProps, doCreateScriptItemAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { PanelActionsTitle } from "../1-header/1-panel-title";
import { PanelActionsList } from "../2-rows/3-panel-items";
import { useInitSelectedIdx } from "@/store/1-atoms/2-file-mani-atoms";
import { focusWithinClasses } from "../../8-manual-shared-styles";

export function ManualPanelActions({ mFormProps, className, ...rest }: { mFormProps: MFormProps; } & HTMLAttributes<HTMLDivElement>) {
    const listRef = useRef<HTMLDivElement>(null);

    const initCb = useInitSelectedIdx(mFormProps.mAllAtoms.manual);
    useEffect(() => { initCb(); }, []);

    const doCreateScriptItem = useSetAtom(doCreateScriptItemAtom);

    async function onCreateNewManual(type: ChunkKey, password: boolean) {
        doCreateScriptItem(mFormProps, type, password);
        
        await delay(500); // TODO: fix this temp hack for the focus
        // console.log('onCreateNewManual', listRef.current);
        
        listRef.current?.focus();
    }

    return (
        <div className={classNames("p-1 pr-0 h-full border-border border rounded flex flex-col space-y-1 select-none", focusWithinClasses, className)} {...rest}>

            <PanelActionsTitle mFormProps={mFormProps} addNew={onCreateNewManual} />

            <div className="relative h-full">
                <div className="absolute inset-0">

                    <ScrollArea className="pr-1 h-full">
                        <PanelActionsList mFormProps={mFormProps} ref={listRef} />
                    </ScrollArea>

                </div>
            </div>
        </div>
    );
}
