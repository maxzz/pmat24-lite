import { type FceCtx } from "@/store";
import { classNames } from "@/utils";
import { PanelMenu_Fc } from "./1-menu-fc";
import { Button_AddItem } from "./2-btn-add-item";
import { ShowPropsTrigger } from "./6-btn-show-poprs.trigger";
import { Button_DeleteItem } from "./3-btn-del-item";

type FieldCatalogToolbarProps = {
    fceCtx: FceCtx;
    showPropsExpand?: boolean;
    className?: string;
};

export function FieldCatalogToolbar({ fceCtx, showPropsExpand, className }: FieldCatalogToolbarProps) {
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
