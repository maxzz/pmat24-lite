import { Page1Apps } from "../1-page-apps";
import { LeftPanelProgress, TestButtons } from "../../8-create-ui";

export function WizardBody() {
    return (
        <div className="h-full grid grid-cols-[auto_1fr]">
            <div className=" bg-muted">
                <LeftPanelProgress className="p-4" />
                <TestButtons />
            </div>

            <Page1Apps />

            {/* <ButtonCreateFormSelector triggerLabel="Create new manifest" /> */}
        </div>
    );
}
