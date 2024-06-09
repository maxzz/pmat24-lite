import { PolicyDlgConv } from "../../0-all";
import { Button, Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { SymbolCross, SymbolWarning } from "@/ui/icons";
import { classNames } from "@/utils";
import { inlineButtonClasses } from "../3-custom-rule/2-button-test-area";
import { useAtomValue } from "jotai";

function ErrorInfoTrigger() {
    return (
        <PopoverTrigger asChild>
            <Button className={classNames(inlineButtonClasses, "p-0 1border-0 1bg-mani-background aspect-square")} size="sm" tabIndex={-1} title="Error">
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
                <PopoverContent className="relative mx-4 py-0 w-auto 1text-foreground 1bg-background border-red-500 border shadow" sideOffset={5} align="center">

                    <div className="my-3 text-xs text-red-500">
                        {errorText}
                    </div>

                    <PopoverArrorWoBottom className="fill-background stroke-red-500" />
                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}
