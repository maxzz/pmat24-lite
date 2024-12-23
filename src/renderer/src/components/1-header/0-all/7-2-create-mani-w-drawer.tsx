import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenDrawerAtom } from "@/store/atoms/7-dialogs";

export function TestCreatewithDrawer() {
    const doOpenDrawer = useSetAtom(doOpenDrawerAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenDrawer(true)}>
            Create
        </Button>
    );
}
