import { useAtomValue, useSetAtom } from "jotai";
import { type ZoomAction, zoomLevelAtom, zoomActionAtom } from "@/store/9-ui-state/8-app-ui";
import { Button } from "@/ui/shadcn";
import { Minus, Plus, Maximize } from "lucide-react";
import { hasMain } from "@/xternal-to-main";

export function ZoomControl() {
    if (!hasMain()) {
        return null;
    }

    const zoomLevel = useAtomValue(zoomLevelAtom);
    const doZoom = useSetAtom(zoomActionAtom);

    const zoomPercent = Math.round(Math.pow(1.2, zoomLevel) * 100);

    return (
        <div className="px-2 py-1.5 flex items-center justify-between select-none">
            <span className="text-xs font-medium">
                Zoom
            </span>

            <div className="flex items-center">
                <div className="mr-1 border-border border rounded-md flex items-center">

                    <Button variant="ghost" size="icon" className="h-6 w-8 rounded-none rounded-l-md hover:bg-accent cursor-pointer" title="Zoom out (Ctrl+-)" onClick={(e) => doZoomAction(e, doZoom, 'out')}>
                        <Minus className="h-3 w-3" />
                    </Button>

                    <span className="px-1 h-6 w-10 text-xs text-center tabular-nums text-foreground/50 border-x border-border flex items-center justify-center">
                        {zoomPercent}%
                    </span>

                    <Button variant="ghost" size="icon" className="h-6 w-8 rounded-none rounded-r-md hover:bg-accent cursor-pointer" title="Zoom in (Ctrl+-)" onClick={(e) => doZoomAction(e, doZoom, 'in')}>
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>

                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-accent cursor-pointer" title="Reset zoom (Ctrl+0)" onClick={(e) => doZoomAction(e, doZoom, 'reset')}>
                    <Maximize className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
}

function doZoomAction(event: React.MouseEvent<HTMLButtonElement>, doZoom: (action: ZoomAction) => void, action: ZoomAction) {
    event.preventDefault();
    doZoom(action);
}
