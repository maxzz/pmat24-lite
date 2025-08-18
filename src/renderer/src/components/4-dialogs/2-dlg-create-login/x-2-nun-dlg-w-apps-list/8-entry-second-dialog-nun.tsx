import { useAtom } from "jotai";
import { SecondPage, doOpenCreateDialogSecondAtom } from "@/store/4-dialogs-atoms";
import * as D from "@/ui/shadcn/dialog";

export function DialogCreateManiV1SecondPage() {
    const [secondPageOpen, doOpenSecondPage] = useAtom(doOpenCreateDialogSecondAtom);
    if (!secondPageOpen) {
        return null;
    }
    return (<>
        <D.Dialog open={!!secondPageOpen} onOpenChange={() => doOpenSecondPage(SecondPage.none)}>
            <D.DialogContent className="p-0 w-2/3! max-w-3xl rounded-md data-[state=open]:[animation-duration:200ms]" noClose>
                
                demo

            </D.DialogContent>
        </D.Dialog>
    </>);
}
