import { ScrollArea } from "@/ui/shadcn";
import { AppsGrid } from "../../8-ui/2-apps-grid";

export function Page1Apps() {
    return (
        <div className="relative -my-4 px-4 text-xs border-l border-border 1grid place-content-center">
            <div className="aboslute inset-0">
                <ScrollArea className="1h-full" fullHeight fixedWidth>
                    <AppsGrid />
                </ScrollArea>
            </div>
        </div>
    );
}
