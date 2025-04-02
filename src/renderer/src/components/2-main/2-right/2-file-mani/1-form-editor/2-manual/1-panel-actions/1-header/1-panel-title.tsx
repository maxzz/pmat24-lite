import { FormIdx } from "@/store/manifest";
import { panelEditorTitleClasses } from "../../8-manual-shared-styles";
import { MFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { ButtonActionsMenuAdd } from "./2-panel-title-menu";
import { classNames } from "@/utils";

export function PanelActionsTitle({ ctx }: { ctx: MFormContextProps; }) {
    const title = ctx.formIdx === FormIdx.login ? "Login actions" : "Password change actions"; // 'Fill in actions'
    return (
        <div className={classNames("-ml-1 -mt-1 pl-2", panelEditorTitleClasses)}>

            <div>
                {title}
            </div>

            <ButtonActionsMenuAdd ctx={ctx} />
        </div>
    );
}
