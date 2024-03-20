import { useState } from "react";
import { Button } from "@/ui/shadcn";
import * as D from "@/ui/shadcn";
import { DialogBody } from "./2-dialog-body";
import { IconMenuHamburger } from "@/ui/icons";

export function DialogDemoWoTrigger() {
    const [isOpen, setIsOpen] = useState(false);
    return (<>
        <Button className="" variant={"ghost"} onClick={() => setIsOpen(true)}>
            <IconMenuHamburger className="size-4 fill-current" />
        </Button>


        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            {/* <D.DialogTrigger asChild> <Button variant="outline">Demo dialog</Button> </D.DialogTrigger> */}

            <D.DialogContent className="sm:max-w-[425px]">

                <DialogBody />

                <D.DialogFooter>
                    <Button type="submit" onClick={() => setIsOpen(false)}>
                        Save changes
                    </Button>
                </D.DialogFooter>

            </D.DialogContent>
        </D.Dialog>
    </>);
}
