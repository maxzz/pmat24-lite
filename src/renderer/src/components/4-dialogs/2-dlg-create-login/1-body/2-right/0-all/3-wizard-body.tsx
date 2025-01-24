import { useAtomValue } from "jotai";
import { LeftPanelProgress, WizardBottomButtons } from "../../8-create-ui";
import { newManiCtx, WizardPage } from "../../9-new-mani-ctx";
import { Page1AppsBody } from "../1-page-apps";
import { Page2FieldsBody } from "../2-page-fields";
import { Page3OptionsBody } from "../3-page-options";
import { Page4SaveBody } from "../4-page-save";

export function WizardBody() {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    return (
        <div className="h-full grid grid-cols-[auto_1fr]">
            <LeftPanelProgress className="p-4 bg-muted border-r border-foreground/20" />

            <div className="h-full grid grid-rows-[1fr_auto]">
                {currentStep === WizardPage.apps && <Page1AppsBody />}
                {currentStep === WizardPage.fields && <Page2FieldsBody />}
                {currentStep === WizardPage.options && <Page3OptionsBody />}
                {currentStep === WizardPage.save && <Page4SaveBody />}

                {/* <ButtonCreateFormSelector triggerLabel="Create new manifest" /> */}

                <WizardBottomButtons className="my-4" />
            </div>
        </div>
    );
}

//TODO: add loader after some time
