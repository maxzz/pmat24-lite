import { useSetAtom } from "jotai";
import { useDissmissNextToasts } from "@/utils";
import { Button } from "@/ui";
import * as D from "@/ui/shadcn/dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { doOpenDlgNewManiSawAtom } from "@/store";
import { DialogBottomButtons } from "./4-dlg-bottom-buttons";
import { ContentEditorSelector } from "../../2-mani-content-editor";
import { ManiLoginNameGuarded } from "./3-mani-login-name";
import { SawPageHeader } from "./2-saw-page-header";

export function DialogSawBody() {

    const doOpenDlg = useSetAtom(doOpenDlgNewManiSawAtom);
    useDissmissNextToasts();

    return (
        <div className="h-full flex flex-col">
            <D.DialogHeader className="relative text-base font-bold border-b border-foreground/20 flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-3 text-sm">
                        New manifest
                    </div>
                </D.DialogTitle>

                <Button className={closeButtonClasses} variant="ghost" size="xs" tabIndex={-1} onClick={() => doOpenDlg(false)}>
                    <Cross2Icon className="size-4" />
                </Button>
            </D.DialogHeader>

            <div className="size-full text-xs 1bg-sky-300 grid grid-rows-[auto,auto,1fr]">
                <SawPageHeader />
                <ManiLoginNameGuarded />
                <ContentEditorSelector />
            </div>

            <DialogBottomButtons className="py-3 border-t border-foreground/20" />
        </div>
    );
}

const closeButtonClasses = "absolute py-4 right-2 -top-0.5 hover:text-white hover:bg-red-500";
