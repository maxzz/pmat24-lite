import { useAtomValue } from "jotai";
import { classNames, useDissmissNextToasts } from "@/utils";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { type NewManiDlgData, dataToOpen_NewManiDlgAtom } from "@/store/4-dialogs-atoms";
import { NewManiContentEditorSelector } from "../../2-mani-content-editor";
import { SawPageHeader } from "./2-saw-page-header";
import { ManiLoginNameGuarded } from "./3-mani-login-name";
import { ComponentPropsWithoutRef } from "react";

export function DialogCreateManiV3Saw() {
    const dataToOpen: NewManiDlgData | undefined = useAtomValue(dataToOpen_NewManiDlgAtom);
    if (!dataToOpen) {
        return null;
    }
    // if (!isDlgOpen) { //TODO: It should not be mounted all the time and animated with framer-motion, but we need to disconnect radix-ui animations.
    //     return null;
    // }

    function onCloseDlg(ok: boolean) {
        if (!dataToOpen) {
            throw new Error('no.in.data');
        }
        dataToOpen.resolve(ok);
    }

    return (
        <D.Dialog open={!!dataToOpen} onOpenChange={() => onCloseDlg(false)}>
            <D.DialogContent className={dialogClasses} overlayClasses="bg-background/10 backdrop-blur-[1px]" hiddenTitle="Create manifest" noClose>
                <DialogSawBody onCloseDlg={onCloseDlg} />
            </D.DialogContent>
        </D.Dialog>
    );
}

function DialogSawBody({ onCloseDlg }: { onCloseDlg: (ok: boolean) => void; }) {
    useDissmissNextToasts();
    return (
        <div className="h-full flex flex-col">
            <D.DialogHeader className="relative text-base font-bold border-b border-foreground/20 flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-3 text-sm">
                        New manifest
                    </div>
                </D.DialogTitle>

                <Button className={closeButtonClasses} variant="ghost" size="xs" tabIndex={-1} onClick={() => onCloseDlg(false)}>
                    <Cross2Icon className="size-4" />
                </Button>
            </D.DialogHeader>

            <div className="size-full text-xs 1bg-sky-300 grid grid-rows-[auto_auto_1fr]">
                <SawPageHeader />
                <ManiLoginNameGuarded />
                <NewManiContentEditorSelector />
            </div>

            <DialogBottomButtons className="py-3 border-t border-foreground/20" onCloseDlg={onCloseDlg} />
        </div>
    );
}

/**
 * Button Save button is always enabled to show toast as hint in case of failure.
 */
function DialogBottomButtons({ onCloseDlg, className, ...rest }: ComponentPropsWithoutRef<"div"> & { onCloseDlg: (ok: boolean) => void; }) {
    return (
        <div className={classNames("relative px-4 flex items-center justify-end gap-1", className)} {...rest}>
            <Button variant="default" size="xs" onClick={() => onCloseDlg(true)}>
                Save
            </Button>
        </div>
    );
}

const dialogClasses = "\
p-0 \
w-11/12! max-w-5xl \
h-4/5 min-h-[60vh] max-h-[90vh] \
rounded-md \
data-[state=open]:duration-ani-0 \
";
// const dialogClasses = "\
// p-0 \
// w-11/12! max-w-5xl \
// h-4/5 min-h-[60vh] max-h-[90vh] \
// rounded-md \
// data-[state=open]:duration-ani-200 \
// ";

const closeButtonClasses = "absolute py-4 right-2 -top-0.5 hover:text-white hover:bg-red-500";
