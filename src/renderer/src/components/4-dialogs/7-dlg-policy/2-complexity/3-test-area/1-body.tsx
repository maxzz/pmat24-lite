import { Button, Input, TextareaAutoGrow } from "@/ui";
import { PolicyDlgConv } from "../../0-all/0-conv";
import { useState } from "react";

const localInputClasses = "h-8 text-mani-foreground bg-mani-background border-mani-border-muted";

export function TestAreaBody({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [explanation, setExplanation] = useState('');
    return (
        <div className="relative mt-4 px-4 py-3 border-border border rounded flex flex-col space-y-2">

            <div className="absolute left-0 -top-2">
                Test area
            </div>

            <div className="">
                <div className="">
                    Explanation
                </div>
                <div className="">
                    Explanation
                </div>
                <div className="">
                    Explanation
                </div>
                <div className="">
                    Explanation
                </div>
            </div>

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
