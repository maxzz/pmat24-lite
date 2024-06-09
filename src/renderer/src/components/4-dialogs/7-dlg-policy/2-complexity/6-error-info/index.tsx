import { PolicyDlgConv } from "../../0-all";
import { Button, Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { SymbolCross, SymbolWarning } from "@/ui/icons";
import { classNames } from "@/utils";
import { inlineButtonClasses } from "../3-custom-rule/2-button-test-area";
import { useAtomValue } from "jotai";

function ErrorInfoTrigger() {
    return (
        <PopoverTrigger asChild>
            <Button className={classNames(inlineButtonClasses, "p-0 border-0 bg-mani-background aspect-square")} size="sm" tabIndex={-1} title="Error">
                <SymbolWarning className="pt-px size-5 text-red-500" />
            </Button>
        </PopoverTrigger>
    );
}

export function ButtonErrorInfo({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const errorText = useAtomValue(dlgUiAtoms.errorTextAtom);
    return (
        <Popover>
            {errorText && (
                <ErrorInfoTrigger />
            )}

            <PopoverPortal>
                <PopoverContent className="relative mx-4 p-0 text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

                    <div className="my-3 text-xs">
                        <div className="mb-2 text-base text-center">
                            Custom rule parts
                        </div>

                        <ScrollArea className="h-64" fullHeight>
                            {errorText}
                        </ScrollArea>
                    </div>

                    <PopoverClose className="absolute top-4 right-4">
                        <SymbolCross className="size-3" />
                    </PopoverClose>

                    <PopoverArrorWoBottom className="fill-background stroke-border" />
                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}
