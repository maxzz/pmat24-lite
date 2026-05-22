import { SymbolInfo } from "@/ui/icons";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui/shadcn/tooltip";

/**
 * This is shown inside the regular expression input field as trigger for the regular expression hint/explanation/example.
 */
export function InlineRegexHelp() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <SymbolInfo className="p-px size-4" />
                </TooltipTrigger>

                <TooltipPortal>
                    <TooltipContent className="mx-[18px] py-2 max-w-80 text-xs text-foreground/75 bg-background border-border border shadow-sm" sideOffset={10}>
                        <div>
                            You can define the regular expression as any part of the original URL, but the website domain will be taken from the original URL.
                            For example, if the original URL is <span className={exampleClasses}>https://login.example.com</span> and the regular expression is <span className={exampleClasses}>login</span>,
                            the domain in this case would be <span className={exampleClasses}>example.com</span>, and the login form would match <span className={exampleClasses}>login.example.com</span>, but not <span className={exampleClasses}>admin.example.com</span>.
                            This allows you to determine where the form will be used.
                        </div>
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    );
}

const exampleClasses = "text-blue-500";
