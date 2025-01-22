import { LeftPanelProgress, TestButtons } from "../../8-create-ui";
import { Page1AppsBody } from "../1-page-apps";
import { Page2FieldsBody } from "../2-page-fields";
import { Page3OptionsBody } from "../3-page-options";
import { Page4SaveBody } from "../4-page-save";

export function WizardBody() {
    return (
        <div className="h-full grid grid-cols-[auto_1fr]">
            <div className=" bg-muted">
                <LeftPanelProgress className="p-4" />
                <TestButtons />
            </div>

            <Page1AppsBody />
            <Page2FieldsBody />
            <Page3OptionsBody />
            <Page4SaveBody />

            {/* <ButtonCreateFormSelector triggerLabel="Create new manifest" /> */}
        </div>
    );
}

//TODO: add loader after some time
