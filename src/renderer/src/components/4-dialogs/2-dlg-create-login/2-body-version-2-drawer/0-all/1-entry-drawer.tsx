import { useAtom } from "jotai";
import * as Dr from "@ui/shadcn/drawer";
import { doOpenDrawerAtom } from "@/store/1-atoms/7-dialogs";
import { WizardBody } from "../../1-body/2-right/0-all/3-wizard-body";

export function ManiDrawer() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (
        <Dr.Drawer shouldScaleBackground={false} open={doOpenDrawer} onOpenChange={setDoOpenDrawer} direction="left" modal>
            <Dr.DrawerContent
                className="w-full h-full max-w-3xl rounded outline-none"
                withoutOverlay
                hiddenTitle="Create manifest"
            >
                <WizardBody />
            </Dr.DrawerContent>
        </Dr.Drawer>
    );
}
