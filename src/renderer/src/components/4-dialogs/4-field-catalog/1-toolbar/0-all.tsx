import { type FceCtx } from "@/store";
import { classNames } from "@/utils";
import { PanelMenu_Fc } from "./1-menu-fc";
import { PanelMenu_AddItem } from "./2-menu-add-item";
import { ShowPropsTrigger } from "./3-show-poprs.trigger";

type FieldCatalogToolbarProps = {
    fceCtx: FceCtx;
    showPropsExpand?: boolean;
    className?: string;
};

export function FieldCatalogToolbar({ fceCtx, showPropsExpand, className }: FieldCatalogToolbarProps) {
    return (
        <div className={classNames("flex items-center justify-end", className)}>
            <PanelMenu_AddItem fceCtx={fceCtx} />
            <ShowPropsTrigger showPropsExpand={showPropsExpand} />
            <PanelMenu_Fc />
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
