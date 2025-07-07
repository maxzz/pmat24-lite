import { type HTMLAttributes, useEffect } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { ScrollArea } from "@/ui";
import { type ChunkKey } from "@/store/manifest";
import { type MFormProps, doCreateScriptItemAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { PanelActionsTitle } from "../1-header/1-panel-title";
import { PanelActionsList } from "../2-rows/3-panel-items";
import { useInitSelectedIdx } from "@/store/1-atoms/2-file-mani-atoms";
import { focusWithinClasses } from "../../8-manual-shared-styles";

export function ManualPanelActions({ mFormProps, className, ...rest }: { mFormProps: MFormProps; } & HTMLAttributes<HTMLDivElement>) {
    const doInitIndexCb = useInitSelectedIdx(mFormProps.mFormCtx.manual);
    useEffect(() => { doInitIndexCb(); }, []);

    const doCreateScriptItem = useSetAtom(doCreateScriptItemAtom);

    function onCreateNewManual(type: ChunkKey, password: boolean) {
        doCreateScriptItem(mFormProps, type, password, mFormProps.mFormCtx.fileUsCtx.formIdx);
    }

    return (
        <div className={classNames("p-1 pr-0 h-full border-border border rounded flex flex-col space-y-1 select-none", focusWithinClasses, className)} {...rest}>

            <PanelActionsTitle mFormProps={mFormProps} addNew={onCreateNewManual} />

            <div className="relative h-full">
                <div className="absolute inset-0">

                    <ScrollArea className="pr-1 h-full">
                        <PanelActionsList mFormProps={mFormProps} />
                    </ScrollArea>

                </div>
            </div>
        </div>
    );
}
