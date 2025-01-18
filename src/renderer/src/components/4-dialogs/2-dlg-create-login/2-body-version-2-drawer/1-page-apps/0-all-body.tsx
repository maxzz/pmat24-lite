import { ScrollArea } from "@/ui/shadcn";
import useResizeObserver from "use-resize-observer";
import { AppsGrid } from "./2-apps-grid";
import { ButtonCreateFormSelector } from "@/components/4-dialogs/9-select-create-mani-type";

export function Page1Apps() {
    const { ref, width, height } = useResizeObserver();
    return (
        <div className="1-my-4 px-4 text-xs border-l border-border grid grid-rows-[auto,1fr,auto] debug">

            <div className="">Description</div>

            <div ref={ref} className="relative 1h-full 1w-full">
                <div className="aboslute inset-0">
                    <ScrollArea style={{ width, height }} fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea>
                </div>
            </div>

            <ButtonCreateFormSelector triggerLabel="Create new manifest" />
        </div>
    );
}
