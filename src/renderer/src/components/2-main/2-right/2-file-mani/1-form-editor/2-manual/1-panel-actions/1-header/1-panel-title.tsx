import { FormIdx } from "@/store/manifest";
import { panelEditorTitleClasses } from "../../8-manual-shared-styles";
import { MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { MenuAddButton } from "./2-panel-title-menu";
import { classNames } from "@/utils";

export function PanelActionsTitle({ ctx }: { ctx: MFormContextProps; }) {
    const title = ctx.formIdx === FormIdx.login ? "Login actions" : "Password change actions"; // 'Fill in actions'
    return (
        <div className={classNames("-mx-1 -mt-1 p-2 pr-1", panelEditorTitleClasses)}>

            <div>
                {title}
            </div>

            <MenuAddButton ctx={ctx} />
        </div>
    );
}
