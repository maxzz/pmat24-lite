import { inputFocusClasses } from "@/ui/local-ui";
import { Button } from "@/ui/shadcn";
import { classNames } from "@/utils";

export function FieldCatalogToolbar({ className }: { className?: string; }) {
    return (
        <div className={classNames("flex items-center justify-end gap-1", className)}>

            <Button className={inputFocusClasses}>
                Filter
            </Button>

            <Button className={inputFocusClasses}>
                Sort by
            </Button>

            <Button className={classNames(inputFocusClasses, "aspect-square")} variant="outline" size="xs">
                +
            </Button>
            
            <Button className={classNames(inputFocusClasses, "aspect-square")} variant="outline" size="xs">
                {'>>'}
            </Button>

        </div>
    );
}

//TODO: add sorting and filtering
//TODO: add expand/collapse properties
