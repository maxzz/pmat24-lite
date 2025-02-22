import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenCreateManiAtom } from "@/store/1-atoms/7-dialogs";

export function TestCreateWithSnapshots() {
    const doOpenDrawer = useSetAtom(doOpenCreateManiAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenDrawer(true)}>
            Create w/ snapshots...
        </Button>
    );
}
