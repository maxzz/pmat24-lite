import { ScrollArea } from "@/ui/shadcn";
import useResizeObserver from "use-resize-observer";
import { AppsGrid } from "./2-apps-grid";
import { ButtonCreateFormSelector } from "@/components/4-dialogs/9-select-create-mani-type";

export function Page1Apps() {
    const { ref, width, height } = useResizeObserver();
    return (
        <div className="-my-4 px-4 text-xs border-l border-border grid grid-rows-[1fr,auto] 1debug">

            {/* <div className="relative">
                <div ref={ref} className="aboslute inset-0">
                    <ScrollArea style={{ width, height }} fullHeight fixedWidth> */}
                        <AppsGrid />
                    {/* </ScrollArea>
                </div>
            </div> */}

            <ButtonCreateFormSelector triggerLabel="Create new manifest" />

        </div>
    );
}
