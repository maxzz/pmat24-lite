import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { FileUs } from "@/store/store-types";

export function SaveButton({ fileUs }: { fileUs: FileUs; }) {
    const changes = useSnapshot(fileUs.changesSet);

    const hasChanges = !!changes.size;
    if (!hasChanges) {
        return null;
    }

    return (<>
        <Button className="active:scale-[.97]" title="Reset file changes">
            Reset
        </Button>

        <Button className="text-background bg-orange-400 hover:bg-orange-500 active:scale-[.97]" title="Save file changes">
            Save
        </Button>
    </>);
}
