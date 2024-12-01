import { type HTMLAttributes, useEffect } from "react";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { PanelActionsTitle } from "./1-panel-title";
import { PanelActionsList } from "./2-panel-items";
import { classNames } from "@/utils";
import { useInitSelectedIdx } from "@/store/atoms/3-file-mani-atoms";
import { editorFrameClasses, focusWithinClasses } from "../8-manual-shared-styles";
import { ScrollArea } from "@/ui";

export function ManualPanelActions({ ctx, className, ...rest }: { ctx: MFormContextProps; } & HTMLAttributes<HTMLDivElement>) {

    const cb = useInitSelectedIdx(ctx.mAllAtoms.manual);
    useEffect(() => { cb(); }, []);

    return (
        <div className={classNames("h-full flex flex-col space-y-1 select-none", editorFrameClasses, focusWithinClasses, className)} {...rest}>

            <PanelActionsTitle ctx={ctx} />

            <div className="relative h-full">
                <div className="absolute inset-0 bg-red-400">
                    <ScrollArea className="pr-1 h-full bg-red-400">
                        <PanelActionsList ctx={ctx} />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
