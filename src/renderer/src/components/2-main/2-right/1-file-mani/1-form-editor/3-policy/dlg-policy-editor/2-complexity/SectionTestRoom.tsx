import { PolicyUiAtoms } from "../0-all/0-create-ui-atoms";
import { TestAreaOpenState, TestAreaSection } from "./9-accordion";
import { TestAreaBody } from "./3-test-room";


export function SectionTestRoom({ atoms }: { atoms: PolicyUiAtoms; }) {
    return (
        <TestAreaOpenState>
            <TestAreaSection label="Test area" value="policy">

                <TestAreaBody />

            </TestAreaSection>
        </TestAreaOpenState>
    );
}
