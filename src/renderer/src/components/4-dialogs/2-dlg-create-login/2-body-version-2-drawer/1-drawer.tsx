import { useAtom } from "jotai";
import * as D from "@ui/shadcn/drawer";
import { doOpenDrawerAtom } from "@/store/atoms/7-dialogs";
import { ButtonCreateFormSelector, LeftPanelProgress, TestButtons } from "../8-create-ui";
import { Page1Apps } from "./1-page-apps";

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
                className="w-full h-full max-w-3xl rounded outline-none"
                withoutOverlay
                hiddenTitle="Create manifest"
            >
                <DrawerBody />
            </D.DrawerContent>
        </D.Drawer>
    );
}

const popupContentDotClasses = "w-3 h-3 inline fill-foreground/70 stroke-foreground/50 stroke-2";
const popupContentTextClasses = "inline-block font-bold font-mono tracking-tight w-8";

function DrawerBody() {
    return (
        <div className="h-full grid grid-cols-[auto_1fr]">
            <div className=" bg-muted">
                <LeftPanelProgress className="p-4" />
                <TestButtons />
            </div>

            <Page1Apps />

            {/* <ButtonCreateFormSelector triggerLabel="Create new manifest" /> */}
        </div>
    );
}
