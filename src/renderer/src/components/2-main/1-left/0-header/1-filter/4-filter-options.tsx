import { Button } from "@ui/shadcn/button";
import * as D from "@ui/shadcn/drawer";
import { SymbolDot } from "@/ui/icons";

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
        <D.Drawer shouldScaleBackground={false}>
            <D.DrawerTrigger asChild>
                <Button variant="outline" className="font-normal">
                    Fiter options
                </Button>
            </D.DrawerTrigger>

            <D.DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    {/* <D.DrawerHeader>
                        <D.DrawerTitle>Search options:</D.DrawerTitle>
                        <D.DrawerDescription>Set your daily activity goal.</D.DrawerDescription>
                    </D.DrawerHeader> */}

                    <DrawerItems />

                    {/* <D.DrawerFooter>
                        <D.DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </D.DrawerClose>
                    </D.DrawerFooter> */}
                </div>
            </D.DrawerContent>
        </D.Drawer>
    );
}
