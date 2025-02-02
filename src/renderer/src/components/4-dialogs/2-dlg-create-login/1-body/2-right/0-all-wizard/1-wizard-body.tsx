import { useAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { LeftPanelProgress, WizardBottomButtons } from "../../8-create-ui";
import { doOpenDrawerAtom } from "@/store";
import { PagesBody } from "./2-pages-body";

export function WizardBody() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (
        <div className="h-full">
            <D.DialogHeader className="relative text-base font-bold flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-4">New manifest</div>
                </D.DialogTitle>

                <D.DialogCloseButton onClick={() => setDoOpenDrawer(false)} tabIndex={-1} />
            </D.DialogHeader>

            <div className="h-full grid grid-cols-[auto_1fr]">
                <LeftPanelProgress className="p-4 bg-muted border-r border-foreground/20" />
                <PagesBody />
            </div>

            <WizardBottomButtons className="my-4" />
        </div>
    );
}
