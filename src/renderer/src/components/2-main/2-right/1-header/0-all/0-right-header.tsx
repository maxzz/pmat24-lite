import { useAtomValue } from "jotai";
import { rightPanelContentAtom } from "@/store";
import { panelHeaderClasses } from "../../../1-left/1-header/0-all";
import { TitleNoFile } from "./1-title-no-file";
import { TitleWithFileUs } from "./2-title-with-file-us";
import { R_PanelMenu } from "../2-menu";
import { Button } from "@/ui";

export function R_PanelHeader() {
    const fileUs = useAtomValue(rightPanelContentAtom);
    if (!fileUs) {
        return (
            <div className={`${panelHeaderClasses} h-10`}>
                <TitleNoFile />
            </div>
        );
    }

    const atoms = useAtomValue(fileUs.atomsAtom);
    if (!atoms) {
        return null;
    }

    const changesCount = useAtomValue(atoms[2]);
    const hasChanges = !!changesCount;

    return (
        <div className={`${panelHeaderClasses} flex items-start justify-between`}>
            <TitleWithFileUs fileUs={fileUs} />

            <div className="flex items-center gap-2">
                {hasChanges && (
                    <Button className="text-background bg-orange-400">Save</Button>
                )}

                <R_PanelMenu />
            </div>
        </div>
    );
}
