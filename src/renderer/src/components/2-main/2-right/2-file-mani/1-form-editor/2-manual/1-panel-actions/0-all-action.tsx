import { HTMLAttributes, useEffect } from "react";
import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { PanelActionsTitle } from "./1-panel-title";
import { PanelActionsList } from "./2-panel-items";
import { classNames } from "@/utils";
//import { useInitSelectedIdx } from "@/store/atoms/3-file-mani-atoms";
import { editorFrameClasses, focusWithinClasses } from "../8-manual-shared-styles";

export function ManualPanelActions({ ctx, className, ...rest }: { ctx: MFormContextProps; } & HTMLAttributes<HTMLDivElement>) {
    // const cb = useInitSelectedIdx();
    // useEffect(() => { cb(); }, []);

    const items = useAtomValue(ctx.formAtoms.manual.chunksAtom);

    return (
        <div className={classNames("flex flex-col space-y-1 select-none", editorFrameClasses, focusWithinClasses, className)} {...rest}>
            <PanelActionsTitle ctx={ctx} />

            <PanelActionsList ctx={ctx} />
        </div>
    );
}
