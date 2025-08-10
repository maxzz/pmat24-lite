import { useAtomValue } from "jotai";
import { rightPanelAtomAtom, fileUsOfRightPanelAtom } from "@/store/1-atoms/3-right-panel";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { panelHeaderClasses } from "../../../1-left/1-header/0-all-header";
import { Row1ChooseName } from "./1-row1-title-with-file-us";
import { Row2AppIcons } from "./2-row2-1-file-icons";
import { Row2Explanation } from "./2-row2-2-file-explanation";
import { Row3FnameParts } from "./2-row3-filename-parts";
import { SaveResetButtons } from "./5-save-reset-buttons";
import { R_PanelMenu } from "../2-menu";
import { ToolbarSelector } from "../3-mini-toolbar/0-all";

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
        <div className={panelHeaderClasses}>
            <div className={"relative max-w-4xl xl:border-r border-border"}>
                <HeaderContent fileUs={fileUs} fileUsAtom={fileUsAtom} />
            </div>
        </div>
    );
}

function HeaderContent({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }) {
    return (<>
        <div className="py-1 text-muted-foreground space-y-1.5 cursor-default">
            <Row1ChooseName fileUs={fileUs} />

            <div className="flex items-center gap-1.5">
                <Row2AppIcons fileUs={fileUs} />
                <Row2Explanation fileUs={fileUs} />
            </div>

            <Row3FnameParts fname={fileUs.fileCnt.fname} fpath={fileUs.fileCnt.fpath} />
        </div>

        <div className=" absolute right-0 top-0.5 flex items-center gap-2">
            <SaveResetButtons fileUs={fileUs} fileUsAtom={fileUsAtom} />
            <R_PanelMenu />
        </div>

        <div className=" absolute right-1 bottom-0.5 flex items-center gap-1">
            <ToolbarSelector fileUs={fileUs} />
        </div>
    </>);
}
