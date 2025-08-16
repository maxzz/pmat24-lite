import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenCreateManiAtom } from "@/store/4-dialogs-atoms";

export function TestCreateWithSnapshots() {
    const doOpen = useSetAtom(doOpenCreateManiAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpen(true)}>
            Create w/ snapshots...
        </Button>
    );
}
