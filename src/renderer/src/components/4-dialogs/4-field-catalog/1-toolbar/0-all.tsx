import { IconMenuHamburger5, SymbolChevronRight, SymbolDoubleDown } from "@/ui/icons";
import { inputFocusClasses } from "@/ui/local-ui";
import { Button } from "@/ui/shadcn";
import { classNames } from "@/utils";

export function FieldCatalogToolbar({ className }: { className?: string; }) {
    return (
        <div className={classNames("flex items-center justify-end gap-1", className)}>

            <Button className={classNames(inputFocusClasses, "aspect-square")} variant="outline" size="xs" tabIndex={-1} title="Add new item">
                +
            </Button>
            
            <Button className={inputFocusClasses} tabIndex={-1} title="Show item details">
                <SymbolDoubleDown className="size-3 -rotate-90" />
            </Button>

            <Button className={classNames(inputFocusClasses, "aspect-square")} variant="outline" size="xs" tabIndex={-1}>
                <IconMenuHamburger5 className="size-3" />
            </Button>

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
