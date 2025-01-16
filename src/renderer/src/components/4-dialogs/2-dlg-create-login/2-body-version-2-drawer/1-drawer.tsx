import { useAtom } from "jotai";
import * as D from "@ui/shadcn/drawer";
import { Button } from "@ui/shadcn/button";
import { SymbolDot } from "@/ui/icons";
import { doOpenDrawerAtom } from "@/store/atoms/7-dialogs";
import { ButtonCreateFormSelector } from "@/components/4-dialogs";
import { StepsDemo, StepsDemo2 } from "../8-ui";

export function ManiDrawer() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (
        <D.Drawer shouldScaleBackground={false} open={doOpenDrawer} onOpenChange={setDoOpenDrawer} direction="left" modal>
            {/* <D.DrawerTrigger asChild>
                <Button variant="outline" className="font-normal">
                    Fiter options
                </Button>
            </D.DrawerTrigger> */}

            <D.DrawerContent
                className="mt-0 py-4 w-full h-full max-w-3xl rounded outline-none"
                withoutOverlay
                hiddenTitle="Page 2"
            >
                <div className="h-full grid place-content-center">
                    <DrawerBody />
                </div>
            </D.DrawerContent>
        </D.Drawer>
    );
}

const popupContentDotClasses = "w-3 h-3 inline fill-foreground/70 stroke-foreground/50 stroke-2";
const popupContentTextClasses = "inline-block font-bold font-mono tracking-tight w-8";

function DrawerBody() {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-4 p-4">
            <StepsDemo2 />

            <div className="text-xs px-1">
                <ButtonCreateFormSelector triggerLabel="Create new manifest" />
            </div>
        </div>
    );
}
