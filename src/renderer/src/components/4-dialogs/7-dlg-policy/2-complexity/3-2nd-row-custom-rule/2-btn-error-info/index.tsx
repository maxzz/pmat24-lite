import { useAtomValue } from "jotai";
import { Button, Popover, PopoverArrorWoBottom, PopoverContent, PopoverPortal, PopoverTrigger } from "@/ui";
import { type PolicyDlgTypes } from "../../../0-all";
import { SymbolWarning } from "@/ui/icons";
import { classNames } from "@/utils";
import { inlineButtonClasses } from "../8-inline-styles";
//import { ErrorInfo } from "../../3-3rd-row-test-area/4-rule-explanation";
import { ErrorInfo } from "../../3-3rd-row-test-area/1-all/5-error-info";

export function ButtonErrorInfo({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const errorText = useAtomValue(dlgUiCtx.errorTextAtom);
    return (
        <Popover>
            {errorText && (
                <ErrorInfoTrigger />
            )}

            <PopoverPortal>
                <PopoverContent className="relative mx-4 py-0 w-auto text-red-500 border-red-500 border shadow-sm" sideOffset={5} align="center">

                    <div className="my-3 text-xs">
                        <ErrorInfo errorTextAtom={dlgUiCtx.errorTextAtom} />
                    </div>

                    <PopoverArrorWoBottom className="fill-background stroke-red-500" />
                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}

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
