import { useState } from "react";
import { Button } from "@/ui/shadcn";
import * as D from "@/ui/shadcn";
import { DialogFilterBody } from "./2-body";
import { IconSearch } from "@/ui/icons";

export function DialogFilterFiles() {
    const [isOpen, setIsOpen] = useState(false);
    return (<>
        <Button className="" variant={"ghost"} onClick={() => setIsOpen(true)} title="Filter files">
            <IconSearch className="p-px size-4" />
        </Button>

        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            {/* <D.DialogTrigger asChild> <Button variant="outline">Demo dialog</Button> </D.DialogTrigger> */}

            <D.DialogContent className="sm:max-w-[425px]">

                <DialogFilterBody />

                <D.DialogFooter>
                    <Button type="submit" onClick={() => setIsOpen(false)}>
                        Save changes
                    </Button>
                </D.DialogFooter>

            </D.DialogContent>
        </D.Dialog>
    </>);
}
