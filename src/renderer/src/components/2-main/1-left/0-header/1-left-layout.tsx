import { HTMLAttributes } from "react";
import { useSetAtom } from "jotai";
import { doClearFileContentAtom } from "@/store";
import { Button } from "@/ui";
import { classNames } from "@/utils";
import { IconMenuHamburger, IconSearch, IconTrash, IconTrash24 } from "@/ui/icons";
import { DialogDemoWoTrigger } from "./3-search";

export const panelHeaderClasses = "px-2 py-1 h-10 text-xs bg-muted border-border border-b group-focus-within:bg-background/30 select-none";

export function L_PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const doClearFileContent = useSetAtom(doClearFileContentAtom);
    return (
        <div className={classNames(panelHeaderClasses, "flex items-center justify-between", className)} {...rest}>

            <div className="">Files</div>

            <div className="flex items-center">
                <Button
                    className="" variant={"ghost"}
                    onClick={() => { doClearFileContent(); }}
                    title="clear files list"
                >
                    <IconSearch className="p-px size-4" />
                </Button>

                {/* <Button
                    className="" variant={"ghost"}
                    onClick={() => { doClearFileContent(); }}
                    title="clear files list"
                >
                    <IconTrash className="size-4" />
                </Button> */}

                <Button
                    className="" variant={"ghost"}
                    onClick={() => { doClearFileContent(); }}
                    title="clear files list"
                >
                    <IconTrash24 className="size-3.5" />
                </Button>

                <DialogDemoWoTrigger />
            </div>
        </div>
    );
}
