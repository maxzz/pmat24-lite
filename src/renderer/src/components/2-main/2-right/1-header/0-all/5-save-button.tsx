import { useAtomValue } from "jotai";
import { Button } from "@/ui";
import { FileUs } from "@/store/store-types";
import { ChangesSet, ManiAtoms } from "@/store/atoms/3-file-mani-atoms";
import { useSnapshot } from "valtio";

function SaveButtonAccess({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const changesSet: ChangesSet = maniAtoms[2];
    const changes = useSnapshot(changesSet);
    const hasChanges = !!changes.size;
    return (<>
        {hasChanges && (
            <Button className="text-background bg-orange-400">Save</Button>
        )}
    </>);
}

export function SaveButtonAccessGuard({ fileUs }: { fileUs: FileUs; }) {
    
    const maniAtoms = useAtomValue(fileUs.atomsAtom);
    if (!maniAtoms) {
        return null;
    }
    
    return (
        <SaveButtonAccess maniAtoms={maniAtoms} />
    );
}
