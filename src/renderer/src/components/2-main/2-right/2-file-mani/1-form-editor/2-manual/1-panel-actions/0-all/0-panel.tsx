import { type HTMLAttributes, useEffect } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { ScrollArea } from "@/ui";
import { type MFormProps, doCreateScriptItemAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { type CreateNewManualAction } from "./9-types";
import { PanelActionsTitle } from "../1-header/1-panel-title";
import { PanelActionsList } from "../2-rows/3-panel-items";
import { useInitSelectedIdx } from "@/store/1-atoms/2-file-mani-atoms";
import { focusWithinClasses } from "../../8-manual-shared-styles";
import { useAtomEffect, useLoginChangesEffectFn } from "./2-login-changes-effect";

export function ManualPanelActions({ mFormProps, className, ...rest }: { mFormProps: MFormProps; } & HTMLAttributes<HTMLDivElement>) {

    const doInitIndexCb = useInitSelectedIdx(mFormProps.mFormCtx.manual);
    useEffect(() => { doInitIndexCb(); }, []);

    useAtomEffect(
        useLoginChangesEffectFn({ mFormProps })
    );

    const doCreateScriptItem = useSetAtom(doCreateScriptItemAtom);

    function onCreateNewManual({ type, password, event }: Parameters<CreateNewManualAction>[0]) {
        doCreateScriptItem(mFormProps, type, password, mFormProps.mFormCtx.fileUsCtx.formIdx, event.ctrlKey);
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
