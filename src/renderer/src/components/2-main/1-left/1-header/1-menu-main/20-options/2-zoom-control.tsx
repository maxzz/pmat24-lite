import { useAtom } from "jotai";
import { zoomLevelAtom } from "@/store/9-ui-state/8-app-ui";
import { R2MCalls } from "@/xternal-to-main";
import { Button } from "@/ui/shadcn";
import { Minus, Plus, Maximize } from "lucide-react";

export type ZoomAction = 'in' | 'out' | 'reset';

export function ZoomControl() {
    const [zoomLevel, setZoomLevel] = useAtom(zoomLevelAtom);

    const handleZoom = (action: ZoomAction) => {
         R2MCalls.zoomCommand(action);
         
         // Optimistic update
         let newLevel = zoomLevel;
         if (action === 'in') newLevel += 0.5;
         else if (action === 'out') newLevel -= 0.5;
         else newLevel = 0;
         setZoomLevel(newLevel);
    };

    const zoomPercent = Math.round(Math.pow(1.2, zoomLevel) * 100);

    return (
        <div className="flex items-center justify-between px-2 py-1.5 select-none">
            <span className="text-xs font-medium">
                Zoom
            </span>

            <div className="flex items-center">
                <div className="flex items-center border rounded-md mr-1 border-border">

                    <Button variant="ghost" size="icon" className="h-6 w-8 rounded-none rounded-l-md hover:bg-accent" onClick={(e) => { e.preventDefault(); handleZoom('out'); }}>
                        <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-10 text-center text-xs tabular-nums border-x border-border px-1">
                        {zoomPercent}%
                    </span>

                    <Button variant="ghost" size="icon" className="h-6 w-8 rounded-none rounded-r-md hover:bg-accent" onClick={(e) => { e.preventDefault(); handleZoom('in'); }}>
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>

                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-accent" onClick={(e) => { e.preventDefault(); handleZoom('reset'); }}>
                    <Maximize className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
}
