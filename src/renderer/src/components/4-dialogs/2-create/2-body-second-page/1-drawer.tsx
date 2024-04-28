import { Button } from "@ui/shadcn/button";
import * as D from "@ui/shadcn/drawer";
import { SymbolDot } from "@/ui/icons";
import { useAtom } from "jotai";
import { doOpenDrawerAtom } from "@/store/atoms/7-dialogs";
import { ButtonCreateFormSelector } from "@/components/4-dialogs";

const popupContentDotClasses = "w-3 h-3 inline fill-foreground/70 stroke-foreground/50 stroke-2";
const popupContentTextClasses = "inline-block font-bold font-mono tracking-tight w-8";

function DrawerItems() {
    return (
        <div className="text-xs px-1">
            <ButtonCreateFormSelector triggerLabel="Create new manifest" />
        </div>
    );
}

export function ManiDrawer() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (
        <D.Drawer shouldScaleBackground={false} open={doOpenDrawer} onOpenChange={setDoOpenDrawer} direction="left" modal>
            {/* <D.DrawerTrigger asChild>
                <Button variant="outline" className="font-normal">
                    Fiter options
                </Button>
            </D.DrawerTrigger> */}

            <D.DrawerContent className="mt-0 py-4 w-full h-full max-w-3xl rounded outline-none" withoutOverlay>
                <div className="h-full grid place-content-center">
                    <DrawerItems />
                </div>
            </D.DrawerContent>
        </D.Drawer>
    );
}
