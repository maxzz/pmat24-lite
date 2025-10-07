import { SymbolInfo } from "@/ui/icons";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui/shadcn/tooltip";

export function RegexTooltip() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="absolute right-2 top-7 text-foreground/75">
                        <SymbolInfo className="size-4" />
                    </div>
                </TooltipTrigger>
                <TooltipPortal>
                    <TooltipContent className="mx-[18px] py-2 max-w-80 text-xs text-foreground/75 bg-background border-border border shadow" sideOffset={10}>
                        <div className="">
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
