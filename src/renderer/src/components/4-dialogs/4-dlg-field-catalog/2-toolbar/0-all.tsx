import { classNames } from "@/utils";
import { type FceCtx } from "@/store/1-atoms/4-field-catalogs";
import { PanelMenu_Fc } from "./1-menu-fc";
import { Button_AddItem, Button_DeleteItem } from "../../../2-main/2-right/1-header/3-mini-toolbar/2-fc-tools";
import { ShowPropsTrigger } from "./6-btn-show-poprs.trigger";

type FieldCatalogToolbarProps = {
    fceCtx: FceCtx;
    showPropsExpand?: boolean;
    className?: string;
};

export function FieldCatalogToolbar({ fceCtx, showPropsExpand, className }: FieldCatalogToolbarProps) {

    const openMainDlg = !fceCtx.inData?.openItemPickerDlg;
    if (!openMainDlg) {
        return <div></div>;
    }

    return (
        <div className={classNames("flex items-center justify-end", className)}>
            <Button_AddItem fceCtx={fceCtx} />
            <Button_DeleteItem fceCtx={fceCtx} />
            <ShowPropsTrigger showPropsExpand={showPropsExpand} />
            <PanelMenu_Fc fceCtx={fceCtx} />
        </div>
    );
}

//TODO: add sorting and filtering
//TODO: add expand/collapse properties

{/* 
    <Button className={inputFocusClasses}>Filter</Button>
    <Button className={inputFocusClasses}>Sort by</Button>
*/}

// const pressClasses = "active:outline-none active:scale-x-[.97] active:shadow-none"; //TODO: make it global
