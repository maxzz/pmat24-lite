import { classNames } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { type CreateNewManualAction } from "../0-all/9-types";
import { MFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ButtonActionsMenuAdd } from "./2-panel-title-menu";
import { panelEditorTitleClasses } from "../../8-manual-shared-styles";

export function PanelActionsTitle({ mFormProps, addNew }: { mFormProps: MFormProps; addNew: CreateNewManualAction; }) {
    const title = mFormProps.mFormCtx.fileUsCtx.formIdx === FormIdx.login ? "Login actions" : "Password change actions"; // 'Fill in actions'
    return (
        <div className={classNames("-ml-1 -mt-1 pl-2", panelEditorTitleClasses)}>

            <div>
                {title}
            </div>

            <ButtonActionsMenuAdd addNew={addNew} />
        </div>
    );
}
