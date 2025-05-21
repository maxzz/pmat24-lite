import { Button, DropdownMenuTrigger } from "@/ui";
import { classNames } from "@/utils";
import { inlineButtonClasses } from "../3-2nd-row-custom-rule/2-button-test-area";

export function MenuAddTrigger() {
    return (
        <DropdownMenuTrigger asChild>
            <Button className={classNames(inlineButtonClasses, "aspect-square")} size="sm" tabIndex={-1} title="Explanation">
                <span>+</span>
            </Button>
        </DropdownMenuTrigger>
    );
}
