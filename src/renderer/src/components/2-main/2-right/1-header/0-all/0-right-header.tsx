import { useAtomValue } from "jotai";
import { rightPanelAtom, rightPanelContentAtom } from "@/store";
import { panelHeaderClasses } from "../../../1-left/1-header/0-all";
import { TitleNoFile } from "./9-title-no-file";
import { TitleWithFileUs } from "./1-title-with-file-us";
import { SaveResetButtons } from "./5-save-reset-buttons";
import { ButtonQuickXml } from "./3-btn-quick-xml";
import { R_PanelMenu } from "../2-menu";

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
        <div className={`${panelHeaderClasses}`}>
            <div className="relative max-w-4xl xl:border-r border-border">
                <TitleWithFileUs fileUs={fileUs} />

                <div className=" absolute right-0 top-0.5 flex items-center gap-2">
                    <SaveResetButtons fileUs={fileUs} fileUsAtom={fileUsAtom} />

                    <ButtonQuickXml />
                    <R_PanelMenu />
                </div>

            </div>
        </div>
    );
}
