import { useAtom } from "jotai";
import { appSettings, fileListOptionsAtom } from "@/store";
import { Button, Checkbox, Label } from "@ui/shadcn";
import * as D from "@ui/shadcn/drawer";
import { SymbolDot } from "@/ui/icons";
import { useSnapshot } from "valtio";
import { Order } from "@/store/store-types";
import { useState } from "react";

const popupContentDotClasses = "w-3 h-3 inline fill-foreground/70 stroke-foreground/50 stroke-2";
const popupContentTextClasses = "inline-block font-bold font-mono tracking-tight w-8";

function DrawerItems() {
    return (
        <div className="text-xs px-1">
            <div className="pb-2 font-bold">Search options:</div>
            <div className="pb-1">Use the search prefix to dispay only:</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>win:</span> logins for Windows apps</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>web:</span> logins for web apps</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>why:</span> logins with problems to check why</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>cap:</span> logins with window caption</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>cls:</span> logins with window classname</div>
        </div>
    );
}

const labelBoldClasses = "block mb-1 text-xs font-semibold";
const subClasses = "py-1 flex flex-col gap-2";
const rowClasses = "text-xs font-normal flex place-items-center gap-1.5";

export function FilterOptions() {

    // const { order, sortBy } = useSnapshot(appSettings.files.sortOrder);
    const order = useSnapshot(appSettings.files.sortOrder).order;

    // console.log(`order: ${order}, sortBy: ${sortBy}`);
    console.log(`order: ${order}`);

    // const [oredBool, setOredBool] = useState(fileListOptionsAtom);
    const [oredBool, setOredBool] = useState(false);
    

    return (
        <div className="flex flex-col gap-2">
            <D.Drawer shouldScaleBackground={false}>
                <D.DrawerTrigger asChild>
                    <Button variant="outline" className="font-normal">
                        Fiter options
                    </Button>
                </D.DrawerTrigger>

                <D.DrawerContent className="mx-auto py-4 w-1/2 max-w-sm rounded" hiddenTitle="Filter options">
                    <div className="grid place-content-center">
                        <DrawerItems />
                    </div>
                </D.DrawerContent>
            </D.Drawer>

            <div className={subClasses}>
                <Label className={rowClasses}>
                    {/* <Checkbox checked={order === Order.lowToHigh} onCheckedChange={(v) => appSettings.files.sortOrder.order = v ? Order.lowToHigh : Order.lowToHigh } /> */}
                    {/* <Checkbox checked={order === Order.lowToHigh} onCheckedChange={(v) => {
                        console.log(`v: ${v}`);
                        
                        appSettings.files.sortOrder.order = !v ? Order.lowToHigh : Order.lowToHigh;
                    }} /> */}
                    <Checkbox checked={oredBool} onCheckedChange={(v) => {
                        console.log(`v: ${v}`);
                        
                        setOredBool(v => !v);
                    }} />
                    Ascending
                </Label>
            </div>

            <Button variant="outline" className="font-normal">
                Sort options
            </Button>
        </div>
    );
}
