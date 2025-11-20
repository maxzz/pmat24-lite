import { DropdownMenuItem } from "@/ui/shadcn";
import { notice_notImplYet } from "@/ui/local-ui";

export function MenuItem_More() {
    return (
        <DropdownMenuItem className="pl-8" {...notice_notImplYet}>
            More...
        </DropdownMenuItem>
    );
}
