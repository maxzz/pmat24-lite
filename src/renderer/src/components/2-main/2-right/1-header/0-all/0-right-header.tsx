import { useAtomValue } from "jotai";
import { rightPanelContentAtom } from "@/store";
import { panelHeaderClasses } from "../../../1-left/1-header/0-all";
import { TitleNoFile } from "./9-title-no-file";
import { TitleWithFileUs } from "./1-title-with-file-us";
import { R_PanelMenu } from "../2-menu";
import { SaveButtonAccessGuard } from "./5-save-button";

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
