import { panelEditorTitleClasses } from "../shared-styles";
import { classNames } from "@/utils";
import { MenuAddButton } from "./1-panel-title-menu";

export function PanelActionsTitle() {
    return (
        <div className="-mx-1 -mt-1">
            <div className={classNames("p-2 pr-1 h-9 flex items-center justify-between", panelEditorTitleClasses)}>
                <div>
                    Fill in actions
                </div>
                <MenuAddButton />
            </div>
        </div>
    );
}
