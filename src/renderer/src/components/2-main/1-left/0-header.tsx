import { HTMLAttributes } from "react";
import { useSetAtom } from "jotai";
import { doClearFileContentAtom } from "@/store";
import { Button } from "@/ui";
import { classNames } from "@/utils";
import { IconMenuHamburger, IconSearch, IconTrash, IconTrash24 } from "@/ui/icons";

export const panelHeaderClasses = "px-2 py-1 h-10 text-xs bg-muted border-border border-b group-focus-within:bg-background/30 select-none";

export function PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
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
                    <IconSearch className="size-4" />
                </Button>

                {/* <Button
                    className="" variant={"ghost"}
                    onClick={() => { doClearFileContent(); }}
                    title="clear files list"
                >
                    <IconTrash className="size-4" />
                </Button>

                <Button
                    className="" variant={"ghost"}
                    onClick={() => { doClearFileContent(); }}
                    title="clear files list"
                >
                    <IconTrash24 className="size-4" />
                </Button> */}

                <Button className="" variant={"ghost"} size={"xs"}>
                    <IconMenuHamburger className="size-4 fill-current" />
                </Button>

            </div>
        </div>
    );
}
