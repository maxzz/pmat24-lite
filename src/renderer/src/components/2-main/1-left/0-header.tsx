import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { IconTrash } from "@/ui/icons";
import { Button } from "@/ui";
import { useSetAtom } from "jotai";
import { filesContentAtom } from "@/store";

export const panelHeaderClasses = "px-3 py-2 text-xs bg-muted border-border border-b group-focus-within:bg-background/30 select-none";

export function PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const filesContent = useSetAtom(filesContentAtom);
    return (
        <div className={classNames(panelHeaderClasses, "h-8 flex items-center justify-between", className)} {...rest}>

            <div className="">Files</div>

            <Button
                className="px-1 h-6" variant={"outline"} size={"xs"}
                onClick={() => { filesContent([]); }}
            >
                <IconTrash className="size-4 fill-current" />
            </Button>
        </div>
    );
}
