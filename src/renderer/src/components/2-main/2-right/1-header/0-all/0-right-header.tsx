import { useAtomValue } from "jotai";
import { rightPanelAtom, rightPanelContentAtom } from "@/store";
import { panelHeaderClasses } from "../../../1-left/1-header/0-all";
import { TitleNoFile } from "./9-title-no-file";
import { TitleWithFileUs } from "./1-title-with-file-us";
import { R_PanelMenu } from "../2-menu";
import { SaveResetButtons } from "./5-save-reset-buttons";

export function R_PanelHeader() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const fileUs = useAtomValue(rightPanelContentAtom);

    if (!fileUsAtom || !fileUs) {
        return (
            <div className={`${panelHeaderClasses} h-10`}>
                <TitleNoFile />
            </div>
        );
    }
    
    return (
        <div className={`${panelHeaderClasses} relative`}>
            <TitleWithFileUs fileUs={fileUs} />

            <div className=" absolute right-1 top-2 flex items-center gap-2">
                <SaveResetButtons fileUs={fileUs} fileUsAtom={fileUsAtom} />

                <R_PanelMenu />
            </div>
        </div>
    );
}
