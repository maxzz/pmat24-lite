import { useAtomValue, useSetAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { doOpenSawOverlayAtom, isOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";

export function MonitorOverlay() {
    const isOpen = useAtomValue(isOpenSawOverlayAtom);
    const doOpen = useSetAtom(doOpenSawOverlayAtom);
    return (<>
        <D.Dialog open={isOpen} onOpenChange={doOpen}>
            <D.DialogContent className={dialogClasses} hiddenTitle="Create manifest" noClose>
                123
            </D.DialogContent>
        </D.Dialog>
    </>);
}

const dialogClasses = "\
p-0 \
!w-11/12 max-w-5xl \
h-4/5 min-h-[60vh] max-h-[90vh] \
rounded-md \
data-[state=open]:[animation-duration:200ms] \
";
