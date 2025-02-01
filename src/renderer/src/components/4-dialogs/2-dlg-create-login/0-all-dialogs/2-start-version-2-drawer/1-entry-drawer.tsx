import { useAtom } from "jotai";
import * as Dr from "@ui/shadcn/drawer";
import * as D from "@/ui/shadcn/dialog";
import { doOpenDrawerAtom } from "@/store/1-atoms/7-dialogs";
import { WizardBody } from "../../1-body/2-right/0-all-wizard";

export function DialogCreateManiV2_() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (
        <Dr.Drawer open={doOpenDrawer} onOpenChange={setDoOpenDrawer} shouldScaleBackground={false} direction="left" modal>
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

export function DialogCreateManiV2() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (<>
        <D.Dialog open={doOpenDrawer} onOpenChange={setDoOpenDrawer}>
            <D.DialogContent className={dialogClasses} hiddenTitle="Create manifest" noClose>
                <WizardBody />
            </D.DialogContent>
        </D.Dialog>
    </>);
}

const dialogClasses = "\
p-0 \
!w-11/12 max-w-3xl \
h-4/5 min-h-[60vh] max-h-[90vh] \
rounded-md \
data-[state=open]:[animation-duration:200ms] \
";

//!1w-4/5 md:!1w-4/5 1max-w-3xl \