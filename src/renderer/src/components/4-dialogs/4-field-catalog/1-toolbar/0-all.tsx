import { useAtom } from "jotai";
import { showPropsAtom, type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { IconMenuHamburger5, SymbolDoubleDown } from "@/ui/icons";
import { inputFocusClasses } from "@/ui/local-ui";
import { PanelMenu_Fc } from "./1-menu-fc";
import { PanelMenu_AddItem } from "./2-menu-add-item";
import { classNames } from "@/utils";

type FieldCatalogToolbarProps = {
    fceCtx: FceCtx;
    showPropsExpand?: boolean;
    className?: string;
};

const pressClasses = "active:outline-none active:scale-x-[.97] active:shadow-none";

export function FieldCatalogToolbar({ fceCtx, showPropsExpand, className }: FieldCatalogToolbarProps) {
    const [showProps, doShowProps] = useAtom(showPropsAtom);

    return (
        <div className={classNames("flex items-center justify-end", className)}>
            <PanelMenu_AddItem />

            {showPropsExpand && (
                <Button variant="ghost" tabIndex={-1} title="Show item details" onClick={() => doShowProps((v) => !v)}>
                    <SymbolDoubleDown className={`size-3 ${showProps ? 'rotate-90' : '-rotate-90'} transition-transform duration-200`} />
                </Button>
            )}

            <PanelMenu_Fc />
        </div>
    );
}

//TODO: add sorting and filtering
//TODO: add expand/collapse properties

{/* <Button className={inputFocusClasses}>
Filter
</Button>

<Button className={inputFocusClasses}>
Sort by
</Button>
 */}

//  <Button className={classNames(inputFocusClasses, "aspect-square")} variant="outline" size="xs">
//  {'>>'}
// </Button>
