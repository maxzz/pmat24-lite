import { ScrollArea } from "@/ui/shadcn";
import useResizeObserver from "use-resize-observer";
import { AppsGrid } from "./2-apps-grid";
import { ButtonCreateFormSelector } from "@/components/4-dialogs/9-select-create-mani-type";

export function Page1Apps() {
    // const { ref, width, height } = useResizeObserver();
    return (
        <div className="1-my-4 px-4 text-xs border-l border-border grid grid-rows-[auto,1fr,auto] debug">
            <div className="text-xl bg-green-400">Description</div>

            {/* <div ref={ref} className="relative h-full w-full">
                <div className="absolute inset-0">
                    <ScrollArea style={{ width, height }} fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea>
                </div>
            </div> */}

            <div className="relative h-full w-full">
                <div className="absolute inset-0">
                    <ScrollArea fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea>
                </div>
            </div>

            <div className="text-xl bg-green-400">
                <ButtonCreateFormSelector triggerLabel="Create new manifest" />
            </div>
        </div>
    );
}
