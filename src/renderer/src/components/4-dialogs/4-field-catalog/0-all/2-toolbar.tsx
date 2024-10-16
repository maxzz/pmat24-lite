import { inputFocusClasses } from "@/ui/local-ui";
import { Button } from "@/ui/shadcn";
import { classNames } from "@/utils";

export function FieldCatalogToolbar({ className }: { className?: string; }) {
    return (
        <div className={classNames("flex items-center justify-end gap-1", className)}>

            <Button className={inputFocusClasses}>
                Add
            </Button>

            <Button className={inputFocusClasses}>
                Close
            </Button>

            <Button className={classNames(inputFocusClasses, "aspect-square")} variant="outline" size="xs">
                +
            </Button>
            
        </div>
    );
}

//TODO: add sorting and filtering
