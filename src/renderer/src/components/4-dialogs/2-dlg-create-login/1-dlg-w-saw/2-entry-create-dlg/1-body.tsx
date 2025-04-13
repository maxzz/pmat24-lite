import { useAtomValue, useSetAtom } from "jotai";
import { useDissmissNextToasts } from "@/utils";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { doOpenDlgNewManiSawAtom, OFormContextProps } from "@/store";
import { DialogBottemButtons } from "./2-dlg-bottom-buttons";
import { ContentEditorSelector } from "../../2-mani-content-editor";
import { ButtonSourceCode } from "../../7-nun-dlg-w-screenshots/8-create-ui";
import { newManiContent } from "../../0-ctx-new-mani";
import { FormIdx } from "@/store/manifest";
import { InputWTooltip, RowInputWTitle } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";

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

                <Button className="absolute py-4 right-2 -top-0.5 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1} onClick={() => doOpenDlg(false)}>
                    <Cross2Icon className="size-4" />
                </Button>
            </D.DialogHeader>

            <SawNewManiBody />

            <DialogBottemButtons className="py-3 border-t border-foreground/20" />
        </div>
    );
}

export function SawNewManiBody() {
    return (
        <div className="size-full text-xs 1bg-sky-300 grid grid-rows-[auto,auto,1fr]">
            <SawPageHeader />
            <ManiName />
            <ContentEditorSelector />
        </div>
    );
}

function ManiName() {
    const fileUs = useAtomValue(newManiContent.fileUsAtom);
    if (!fileUs) {
        return null;
    }


    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const [login, cpass] = maniAtoms;
    const loginCtx: OFormContextProps | undefined = login && { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };

    if (!loginCtx) {
        return null;
    }

    const { nameAtom } = loginCtx.oAllAtoms.options.p1General;

    return (
        <div className="px-3 pb-2 text-xs flex flex-col gap-1">
            <div className="font-semibold">
                Login name
            </div>
            <InputWTooltip stateAtom={nameAtom} />
        </div>
    );
}

export function SawPageHeader() {
    const [title, explanation] = ['New manifest', 'Sellect the fields you want to use for the new manifest, submit method and other options.'];
    return (
        <div className="px-3 py-3 text-sm bg-muted/30 flex items-center justify-between gap-0.5">

            <div className="flex flex-col gap-0.5">
                <div className="text-xs font-semibold">{title}</div>
                <div className="text-xs text-foreground/50">{explanation}</div>
            </div>

            <ButtonSourceCode />
        </div>
    );
}
