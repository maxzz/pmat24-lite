import { ScrollArea } from "@/ui/shadcn";
import { AppsGrid } from "../../8-ui/2-apps-grid";
import { ButtonCreateFormSelector } from "@/components/4-dialogs/9-select-create-mani-type";

export function Page1Apps() {
    return (
        <div className="-my-4 px-4 text-xs border-l border-border grid grid-rows-[1fr,auto] 1debug">

            <div className="relative">
                <div className="aboslute inset-0">
                    <ScrollArea className="1h-full" fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea>
                </div>
            </div>

            <ButtonCreateFormSelector triggerLabel="Create new manifest" />
        </div>
    );
}
