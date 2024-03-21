import { HTMLAttributes } from "react";
import { useSetAtom } from "jotai";
import { doClearFileContentAtom } from "@/store";
import { Button } from "@/ui";
import { classNames } from "@/utils";
import { IconTrash24 } from "@/ui/icons";
import { DialogFilterFiles } from "./1-filter";
import { L_PanelMenu } from "./3-menu";

export const panelHeaderClasses = "px-2 py-1 h-10 text-xs bg-muted border-border border-b group-focus-within:bg-background/30 select-none";

export function L_PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const doClearFileContent = useSetAtom(doClearFileContentAtom);
    return (
        <div className={classNames(panelHeaderClasses, "flex items-center justify-between", className)} {...rest}>

            <div className="">Files</div>

            <div className="flex-1 flex items-center justify-between">
                <DialogFilterFiles />

                {/* <Button
                    className="" variant={"ghost"}
                    onClick={() => { doClearFileContent(); }}
                    title="Clear files list"
                >
                    <IconTrash24 className="size-3.5" />
                </Button> */}

                <L_PanelMenu />
            </div>
        </div>
    );
}
