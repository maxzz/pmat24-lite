import { useAtomValue, useSetAtom } from "jotai";
import { hasMain } from "@/xternal-to-main";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { EyeClosed, EyeIcon } from "lucide-react";
import { classNames, useDissmissNextToasts } from "@/utils";
import { doOpenCreateManiSawAtom } from "@/store";
import { isSawModeOnClientAtom } from "../0-ctx";
import { ComponentPropsWithoutRef } from "react";
import { Page2FieldsBody } from "../../2-dlg-w-screenshots/2-right/2-pages/2-page-fields";

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

            <Page2FieldsBody />

            <WizardButtonsSaw className="py-3 border-t border-foreground/20" />
        </div>
    );
}

function WizardButtonsSaw({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const doOpen = useSetAtom(doOpenCreateManiSawAtom);
    return (
        <div className={classNames("relative px-4 flex items-center justify-end gap-1", className)} {...rest}>
            <Button
                variant="default"
                size="xs"
                onClick={() => doOpen(false)} // always enabled to show toast as hint
            >
                Save
            </Button>
        </div>
    );
}

function SawModeDisplay({ className, ...rest }: ComponentPropsWithoutRef<'svg'>) {
    const isSawModeOnClient = useAtomValue(isSawModeOnClientAtom);
    return (<>
        {isSawModeOnClient
            ? <EyeIcon className={classNames("size-4", className)} {...rest} />
            : <EyeClosed className={classNames("size-4", className)} {...rest} />
        }
    </>);
}
