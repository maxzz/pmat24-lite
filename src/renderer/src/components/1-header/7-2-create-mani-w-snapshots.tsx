import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenCreateManiAtom } from "@/store/1-atoms/7-dialogs";

export function TestCreateWithSnapshots() {
    const doOpen = useSetAtom(doOpenCreateManiAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpen(true)}>
            Create w/ snapshots...
        </Button>
    );
}
