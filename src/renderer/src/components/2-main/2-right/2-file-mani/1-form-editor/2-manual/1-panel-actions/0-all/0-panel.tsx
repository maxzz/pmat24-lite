import { type HTMLAttributes, useEffect } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { ScrollArea } from "@/ui";
import { type ChunkKey } from "@/store/manifest";
import { type MFormContextProps, doCreateItemAtom } from "@/store/1-atoms/3-file-mani-atoms";
import { PanelActionsTitle } from "../1-header/1-panel-title";
import { PanelActionsList } from "../2-rows/3-panel-items";
import { useInitSelectedIdx } from "@/store/1-atoms/3-file-mani-atoms";
import { focusWithinClasses } from "../../8-manual-shared-styles";

export function ManualPanelActions({ ctx, className, ...rest }: { ctx: MFormContextProps; } & HTMLAttributes<HTMLDivElement>) {

    const initCb = useInitSelectedIdx(ctx.mAllAtoms.manual);
    useEffect(() => { initCb(); }, []);

    const doCreateItem = useSetAtom(doCreateItemAtom);

    function onCreateNewManual(type: ChunkKey, password: boolean) {
        doCreateItem(ctx.mAllAtoms.manual, type, password);
    }

    return (
        <div className={classNames("p-1 pr-0 h-full border-border border rounded flex flex-col space-y-1 select-none", focusWithinClasses, className)} {...rest}>

            <PanelActionsTitle ctx={ctx} addNew={onCreateNewManual} />

            <div className="relative h-full">
                <div className="absolute inset-0">
                    <ScrollArea className="pr-1 h-full">
                        <PanelActionsList ctx={ctx} />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
