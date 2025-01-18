import { ScrollArea } from "@/ui/shadcn";
import { AppsGrid } from "./2-apps-grid";
import { ButtonCreateFormSelector } from "@/components/4-dialogs/9-select-create-mani-type";

export function Page1Apps() {
    return (
        <div className="1-my-4 text-xs border-l border-border grid grid-rows-[auto,1fr,auto] debug">
            <div className="px-2 py-1 text-sm bg-muted/30">
                Description
            </div>

            <div className="relative h-full w-full">
                <div className="absolute inset-0">
                    <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea>
                </div>
            </div>

            <div className="px-1 py-2 bg-muted/30 border-t border-border">
                <ButtonCreateFormSelector triggerLabel="Create new manifest" />
            </div>
        </div>
    );
}
