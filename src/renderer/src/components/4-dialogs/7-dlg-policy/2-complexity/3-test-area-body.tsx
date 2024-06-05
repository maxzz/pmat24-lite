import { Button, Input } from "@/ui";

export function TestAreaBody() {
    return (
        <div className="mt-2 flex flex-col space-y-2">
            <div className="h-9 flex items-center space-x-2">
                <Input className="text-mani-foreground bg-mani-background border-mani-border-muted" />

                <Button className="h-full" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    Verify
                </Button>
            </div>

            <div className="h-9 flex items-center space-x-2">
                <Input className="text-mani-foreground bg-mani-background border-mani-border-muted" />

                <Button className="h-full" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    Generate
                </Button>
            </div>
        </div>
    );
}
