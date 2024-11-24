import { useAtomValue } from "jotai";
import { rightPanelAtom, fileUsOfRightPanelAtom } from "@/store";
import { panelHeaderClasses } from "../../../1-left/1-header/0-all";
import { TitleNoFile } from "./9-title-no-file";
import { SaveResetButtons } from "./5-save-reset-buttons";
import { ButtonQuickXml } from "./3-btn-quick-xml";
import { R_PanelMenu } from "../2-menu";
import { Row1ChooseName } from "./1-row1-title-with-file-us";
import { Row2AppIcons } from "./2-row2-1-file-icons";
import { Row2Explanation } from "./2-row2-2-file-explanation";
import { Row3FnameParts } from "./2-row3-filename-parts";

export function R_PanelHeaderBody() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const fileUs = useAtomValue(fileUsOfRightPanelAtom);

    if (!fileUsAtom || !fileUs) {
        return (
            <div className={`${panelHeaderClasses} h-10`}>
                <TitleNoFile />
            </div>
        );
    }

    return (
        <div className={panelHeaderClasses}>
            <div className={"relative max-w-4xl xl:border-r border-border"}>

                <div className="py-1 text-muted-foreground space-y-1.5 cursor-default">

                    <Row1ChooseName fileUs={fileUs} />

                    <div className="flex items-center gap-1.5">
                        <Row2AppIcons fileUs={fileUs} />
                        <Row2Explanation fileUs={fileUs} />
                    </div>

                    <Row3FnameParts fname={fileUs.fileCnt.fname} />
                </div>

                <div className=" absolute right-0 top-0.5 flex items-center gap-2">
                    <SaveResetButtons fileUs={fileUs} fileUsAtom={fileUsAtom} />

                    <ButtonQuickXml />
                    <R_PanelMenu />
                </div>

            </div>
        </div>
    );
}
