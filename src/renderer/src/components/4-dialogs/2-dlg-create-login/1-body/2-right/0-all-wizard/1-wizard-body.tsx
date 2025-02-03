import { useAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { LeftPanelProgress, WizardBottomButtons } from "../../8-create-ui";
import { doOpenDrawerAtom } from "@/store";
import { PagesBody } from "./2-pages-body";
import { Button } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";

export function WizardBody() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (
        <div className="h-full flex flex-col">
            <D.DialogHeader className="relative text-base font-bold border-b border-foreground/20 flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-3">New manifest</div>
                </D.DialogTitle>

                <Button className="absolute py-4 right-2 top-0 0 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1} onClick={() => setDoOpenDrawer(false)}>
                    <Cross2Icon className="size-4" />
                </Button>

                {/* <D.DialogCloseButton className="top-2" onClick={() => setDoOpenDrawer(false)} tabIndex={-1} /> */}
            </D.DialogHeader>

            <div className="h-full grid grid-cols-[auto_1fr]">
                <LeftPanelProgress className="p-4 bg-muted border-r border-foreground/20 justify-center" />
                <PagesBody />
            </div>

            <WizardBottomButtons className="py-3 border-t border-foreground/20" />
        </div>
    );
}
