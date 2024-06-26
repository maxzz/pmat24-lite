import { PolicyDlgConv } from "../../0-all";
import { Button, Popover, PopoverArrorWoBottom, PopoverContent, PopoverPortal, PopoverTrigger } from "@/ui";
import { SymbolWarning } from "@/ui/icons";
import { classNames } from "@/utils";
import { inlineButtonClasses } from "../3-custom-rule/2-button-test-area";
import { useAtomValue } from "jotai";
import { ErrorInfo } from "../3-test-area/4-rule-explanation";

function ErrorInfoTrigger() {
    return (
        <PopoverTrigger asChild>
            <Button
                className={classNames(inlineButtonClasses, "p-0 text-red-500 hover:text-red-500 aspect-square")}
                size="sm"
                tabIndex={-1}
                title="Attention. Click to see the message"
            >
                <SymbolWarning className="pt-px size-5" />
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
                <PopoverContent className="relative mx-4 py-0 w-auto text-red-500 border-red-500 border shadow" sideOffset={5} align="center">

                    <div className="my-3 text-xs">
                        <ErrorInfo errorText={errorText} />
                    </div>

                    <PopoverArrorWoBottom className="fill-background stroke-red-500" />
                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}
