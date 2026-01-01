import { Button } from "@/ui/shadcn";
import { Minus, Plus, Maximize } from "lucide-react";

export type ZoomAction = 'in' | 'out' | 'reset';

type ZoomControlProps = {
    zoomPercent: number;
    onZoom: (action: ZoomAction) => void;
};

export function ZoomControl({ zoomPercent, onZoom }: ZoomControlProps) {
    return (
        <div className="flex items-center justify-between px-2 py-1.5 select-none">
            <span className="text-sm font-medium">Zoom</span>
            <div className="flex items-center">
                <div className="flex items-center border rounded-md mr-1 border-border">
                     <Button variant="ghost" size="icon" className="h-6 w-8 rounded-none rounded-l-md hover:bg-accent" onClick={(e) => { e.preventDefault(); onZoom('out'); }}>
                        <Minus className="h-3 w-3" />
                     </Button>
                     <span className="w-10 text-center text-xs tabular-nums border-x border-border px-1">{zoomPercent}%</span>
                     <Button variant="ghost" size="icon" className="h-6 w-8 rounded-none rounded-r-md hover:bg-accent" onClick={(e) => { e.preventDefault(); onZoom('in'); }}>
                        <Plus className="h-3 w-3" />
                     </Button>
                </div>
                 <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-accent" onClick={(e) => { e.preventDefault(); onZoom('reset'); }}>
                    <Maximize className="h-3 w-3" />
                 </Button>
            </div>
        </div>
    );
}
