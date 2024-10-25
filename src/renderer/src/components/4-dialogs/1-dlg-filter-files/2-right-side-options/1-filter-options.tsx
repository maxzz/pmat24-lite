import { Button } from "@ui/shadcn";
import * as Dr from "@ui/shadcn/drawer";
import { SymbolDot } from "@/ui/icons";
import { CheckAscending } from "./2-order";
import { CheckSortBy } from "./3-sort-by";

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

export function FilterOptions() {
    return (
        <div className="flex flex-col gap-2">
            <Dr.Drawer shouldScaleBackground={false}>
                <Dr.DrawerTrigger asChild>
                    <Button variant="outline" className="font-normal">
                        Fiter options
                    </Button>
                </Dr.DrawerTrigger>

                <Dr.DrawerContent className="mx-auto py-4 w-1/2 max-w-sm rounded" hiddenTitle="Filter options">
                    <div className="grid place-content-center">
                        <DrawerItems />
                    </div>
                </Dr.DrawerContent>
            </Dr.Drawer>

            <CheckAscending />
            <CheckSortBy />

            {/* <Button variant="outline" className="font-normal">
                Sort options
            </Button> */}
        </div>
    );
}
