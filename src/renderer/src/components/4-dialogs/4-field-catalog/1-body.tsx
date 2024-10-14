import * as D from "@/ui/shadcn/dialog";
import { Button, Checkbox, Input, Label } from "@/ui";
import { classNames } from "@/utils";

export function DialogFieldCatalogBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {

    return (
        <div className="min-h-56 text-xs select-none">

            <D.DialogHeader className="relative text-base font-bold border-border border-b flex items-center">
                <div className="py-4">PMAT Options</div>
                <D.DialogCloseButton className="right-1 -top-0.5 p-4 hover:bg-muted hover:rounded-md" tabIndex={-1} onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="px-4 py-4 grid grid-cols-1 gap-6">
                456
            </div>

            <div className="py-4 boreder-border border-t text-center">
                <Button variant="default" size={"sm"} onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </div>
        </div>
    );
}
