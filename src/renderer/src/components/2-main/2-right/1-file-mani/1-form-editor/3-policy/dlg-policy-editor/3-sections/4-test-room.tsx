import { Button, Input } from "@/ui";
import { PolicyUiAtoms } from "../0-all/0-create-ui-atoms";
import { TestAreaOpenState, TestAreaSection } from "../4-constrols/9-accordion";

function TestAreaBody() {
    return (
        <div className="mt-2 flex flex-col space-y-2">
            <div className="h-9 flex items-center space-x-2">
                <Input className="" />

                <Button className="h-full" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    Verify
                </Button>
            </div>

            <div className="h-9 flex items-center space-x-2">
                <Input className="" />

                <Button className="h-full" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    Generate
                </Button>
            </div>
        </div>
    );
}

export function SectionTestRoom({ atoms }: { atoms: PolicyUiAtoms; }) {
    return (
        <TestAreaOpenState>
            <TestAreaSection label="Test area" value="policy">

                <TestAreaBody />

            </TestAreaSection>
        </TestAreaOpenState>
    );
}
