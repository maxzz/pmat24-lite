import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { FileUs } from "@/store/store-types";

export function SaveButton({ fileUs }: { fileUs: FileUs; }) {
    const changes = useSnapshot(fileUs.changesSet);
    const hasChanges = !!changes.size;
    return (<>
        {hasChanges && (
            <Button className="text-background bg-orange-400">Save</Button>
        )}
    </>);
}
