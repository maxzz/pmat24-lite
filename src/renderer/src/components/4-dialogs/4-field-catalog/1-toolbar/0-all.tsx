import { useAtom } from "jotai";
import { type FldCatInData, showPropsAtom } from "@/store";
import { Button } from "@/ui/shadcn";
import { IconMenuHamburger5, SymbolDoubleDown } from "@/ui/icons";
import { inputFocusClasses } from "@/ui/local-ui";
import { FC_PanelMenu } from "./1-fc-menu";
import { AddItem_PanelMenu } from "./2-add-item-menu";
import { classNames } from "@/utils";

type FieldCatalogToolbarProps = {
    ctx: FldCatInData;
    className?: string;
};

const pressClasses = "active:outline-none active:scale-x-[.97] active:shadow-none";

export function FieldCatalogToolbar({ className }: FieldCatalogToolbarProps) {
    const [showProps, doShowProps] = useAtom(showPropsAtom);

    return (
        <div className={classNames("flex items-center justify-end gap-1", className)}>

            {/* <Button className={classNames(inputFocusClasses, pressClasses, "aspect-square")} variant="outline" size="xs" tabIndex={-1} title="Add new item">
                +
            </Button> */}
            <AddItem_PanelMenu />

            {/* <Button className={classNames(inputFocusClasses, pressClasses, "aspect-square")} tabIndex={-1} title="Show item details" onClick={() => doShowProps((v) => !v)}> */}
            <Button variant="ghost" tabIndex={-1} title="Show item details" onClick={() => doShowProps((v) => !v)}>
                <SymbolDoubleDown className={`size-3 ${showProps ? 'rotate-90' : '-rotate-90'} transition-transform duration-200`} />
            </Button>

            {/* <Button className={classNames(inputFocusClasses, pressClasses, "aspect-square")} variant="outline" size="xs" tabIndex={-1}>
                <IconMenuHamburger5 className="size-3" />
            </Button> */}

            <FC_PanelMenu />

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
