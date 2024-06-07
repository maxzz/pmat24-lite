import { Button, Input } from "@/ui";

const localInputClasses = "h-8 text-mani-foreground bg-mani-background border-mani-border-muted";

export function TestAreaBody() {
    return (
        <div className="mt-2 flex flex-col space-y-2">
            <div className="h-8 flex items-center space-x-2">
                <Input className={localInputClasses} />

                <Button className="min-w-20" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    Verify
                </Button>
            </div>

            <div className="h-8 flex items-center space-x-2">
                <Input className={localInputClasses} />

                <Button className="min-w-20" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    Generate
                </Button>
            </div>
        </div>
    );
}
