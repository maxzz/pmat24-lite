import { Button, PopoverTrigger } from "@/ui";
import { inlineButtonClasses } from "../3-custom-rule/2-button-test-area";
import { classNames } from "@/utils";

export function ButtonTrigger() {
    return (
        <PopoverTrigger asChild>
            <Button className={classNames(inlineButtonClasses, "aspect-square")} size="sm" tabIndex={-1} title="Explanation">
                ?
            </Button>
        </PopoverTrigger>
    );
}
