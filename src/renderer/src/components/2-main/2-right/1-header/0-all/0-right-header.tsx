import { useAtomValue } from "jotai";
import { rightPanelContentAtom } from "@/store";
import { panelHeaderClasses } from "../../../1-left/1-header/0-all";
import { TitleNoFile } from "./9-title-no-file";
import { TitleWithFileUs } from "./1-title-with-file-us";
import { R_PanelMenu } from "../2-menu";
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

function SaveButtonAccessGuard({ fileUs }: { fileUs: FileUs; }) {
    const maniAtoms = useAtomValue(fileUs.atomsAtom);
    if (!maniAtoms) {
        return null;
    }
    return (<>
        <SaveButtonAccess maniAtoms={maniAtoms} />
    </>);
}

export function R_PanelHeader() {
    const fileUs = useAtomValue(rightPanelContentAtom);
    if (!fileUs) {
        return (
            <div className={`${panelHeaderClasses} h-10`}>
                <TitleNoFile />
            </div>
        );
    }
    return (
        <div className={`${panelHeaderClasses} flex items-start justify-between`}>
            <TitleWithFileUs fileUs={fileUs} />

            <div className="flex items-center gap-2">
                <SaveButtonAccessGuard fileUs={fileUs} />

                <R_PanelMenu />
            </div>
        </div>
    );
}
