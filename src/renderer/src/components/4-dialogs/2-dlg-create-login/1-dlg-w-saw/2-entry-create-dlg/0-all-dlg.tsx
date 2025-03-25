import { useAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { doOpenDlgNewManiSawAtom } from "@/store/1-atoms/7-dialogs";
import { DialogSawBody } from "./1-body";

export function DialogCreateManiV3Saw() {
    const [isDlgOpen, setIsDlgOpen] = useAtom(doOpenDlgNewManiSawAtom);
    return (<>
        <D.Dialog open={isDlgOpen} onOpenChange={setIsDlgOpen}>
            <D.DialogContent className={dialogClasses} hiddenTitle="Create manifest" noClose>
                <DialogSawBody />
            </D.DialogContent>
        </D.Dialog>
    </>);
}

const dialogClasses = "\
p-0 \
!w-11/12 max-w-5xl \
h-4/5 min-h-[60vh] max-h-[90vh] \
rounded-md \
data-[state=open]:[animation-duration:0ms] \
";
// const dialogClasses = "\
// p-0 \
// !w-11/12 max-w-5xl \
// h-4/5 min-h-[60vh] max-h-[90vh] \
// rounded-md \
// data-[state=open]:[animation-duration:200ms] \
// ";
