import { panelEditorTitleClasses } from "../8-manual-shared-styles";
import { MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { MenuAddButton } from "./1-panel-title-menu";
import { classNames } from "@/utils";

export function PanelActionsTitle({ ctx }: { ctx: MFormContextProps; }) {
    return (
        <div className="-mx-1 -mt-1">
            <div className={classNames("p-2 pr-1 h-9 flex items-center justify-between", panelEditorTitleClasses)}>

                <div>
                    Fill in actions
                </div>

                <MenuAddButton ctx={ctx} />
            </div>
        </div>
    );
}
