import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { rightPanelAtomAtom, fileUsOfRightPanelAtom } from "@/store/5-3-right-panel";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { panelHeaderClasses } from "../../../1-left/1-header/0-all-header";
import { Row1_ManiChooseName } from "./1-row1-title-with-file-us";
import { Row2_AppIcons } from "./2-row2-1-file-icons";
import { Row2_Explanation } from "./2-row2-2-file-explanation";
import { Row3_FnameParts } from "./2-row3-filename-parts";
import { SaveResetButtons } from "./5-save-reset-buttons";
import { R_PanelMenu } from "../2-menu";
import { ToolbarCodeSelector } from "../3-mini-toolbar/0-all";

export function R_PanelHeaderBody() {
    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    const fileUs = useAtomValue(fileUsOfRightPanelAtom);

    if (!fileUsAtom || !fileUs) {
        return (
            <div className={`${panelHeaderClasses} h-10`}>
                <div className="h-full select-none flex items-center">
                    No File
                </div>
            </div>
        );
    }

    return (
        <HeaderContent fileUs={fileUs} fileUsAtom={fileUsAtom} />
    );
}

function HeaderContent({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }) {
    return (
        <div className={classNames(panelHeaderClasses, "pr-1! max-w-4xl xl:border-r border-border grid")}>
            <div className="min-w-0 flex items-center justify-between">
                <Row1_ManiChooseName fileUs={fileUs} />

                <div className="flex-none flex items-center gap-1">
                    <SaveResetButtons fileUs={fileUs} fileUsAtom={fileUsAtom} />
                    <R_PanelMenu />
                </div>
            </div>

            <div className="min-w-0 flex items-center gap-1.5">
                <Row2_AppIcons fileUs={fileUs} />
                <Row2_Explanation fileUs={fileUs} />
            </div>

            <div className="min-w-0 flex items-center justify-between">
                <Row3_FnameParts fname={fileUs.fileCnt.fname} fpath={fileUs.fileCnt.fpath} />
                <ToolbarCodeSelector fileUs={fileUs} />
            </div>
        </div>
    );
}
