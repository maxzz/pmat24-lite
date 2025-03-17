import { useSetAtom } from "jotai";
import { useDissmissNextToasts } from "@/utils";
import { hasMain } from "@/xternal-to-main";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { doOpenCreateManiSawAtom } from "@/store";
import { Page2FieldsBody } from "../../2-dlg-w-screenshots/2-right/2-pages/2-page-fields";
import { DialogBottemButtons } from "./2-dlg-bottom-buttons";

export function DialogSawBody() {

    const doOpen = useSetAtom(doOpenCreateManiSawAtom);
    useDissmissNextToasts();

    return (
        <div className="h-full flex flex-col">
            <D.DialogHeader className="relative text-base font-bold border-b border-foreground/20 flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-3 text-sm">
                        New manifest
                    </div>
                </D.DialogTitle>

                {!hasMain() && (
                    <div className="absolute -left-[38px] -top-[14px] scale-[.74] bg-muted/50 rounded-tl-md border border-foreground/10">
                        {/* <DebugButtons /> */}
                    </div>
                )}

                <Button
                    className="absolute py-4 right-2 -top-0.5 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1}
                    onClick={() => doOpen(false)}
                >
                    <Cross2Icon className="size-4" />
                </Button>
            </D.DialogHeader>

            {/* <Page2FieldsBody /> */}
            {/* <ContentEditorSelector /> */}

            <DialogBottemButtons className="py-3 border-t border-foreground/20" />
        </div>
    );
}
