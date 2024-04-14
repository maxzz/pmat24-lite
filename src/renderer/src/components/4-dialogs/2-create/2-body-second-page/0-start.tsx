import { useAtom } from "jotai";
import { SecondPage, doOpenCreateDialogSecondAtom } from "@/store/atoms/4-dialogs";
import * as D from "@/ui/shadcn/dialog";

export function CreateManiSecondDialog() {
    const [secondPageOpen, setSecondPageOpen] = useAtom(doOpenCreateDialogSecondAtom);
    if (!secondPageOpen) {
        return null;
    }
    return (<>
        <D.Dialog open={!!secondPageOpen} onOpenChange={() => setSecondPageOpen(SecondPage.none)}>
            <D.DialogContent className="p-0 !w-2/3 max-w-3xl rounded-md data-[state=open]:[animation-duration:200ms]" noClose>
                
                demo

            </D.DialogContent>
        </D.Dialog>
    </>);
}
