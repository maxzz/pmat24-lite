import { inputFocusClasses } from "@/ui/local-ui";
import { Button } from "@/ui/shadcn";

export function FieldCatalogToolbar({ className }: { className?: string; }) {
    return (
        <div className="flex items-center justify-end gap-1">
            {/* <div className="text-xs text-primary-400">Field catalog items</div> */}

            <Button className={inputFocusClasses}>Add</Button>
            <Button className={inputFocusClasses}>Close</Button>
        </div>
    );
}

//TODO: add sorting and filtering
