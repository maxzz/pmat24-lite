import { type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
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

            <div className="h-full grid grid-rows-[1fr_auto] overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                    {currentStep === WizardPage.apps && <PageWrapper currentStep={currentStep} thisStep={WizardPage.apps} key={WizardPage.apps}><Page1AppsBody /></PageWrapper>}
                    {currentStep === WizardPage.fields && <PageWrapper currentStep={currentStep} thisStep={WizardPage.fields} key={WizardPage.fields}><Page2FieldsBody /></PageWrapper>}
                    {currentStep === WizardPage.options && <PageWrapper currentStep={currentStep} thisStep={WizardPage.options} key={WizardPage.options}><Page3OptionsBody /></PageWrapper>}
                    {currentStep === WizardPage.save && <PageWrapper currentStep={currentStep} thisStep={WizardPage.save} key={WizardPage.save}><Page4SaveBody /></PageWrapper>}
                </AnimatePresence>

                {/* <ButtonCreateFormSelector triggerLabel="Create new manifest" /> */}

                <WizardBottomButtons className="my-4" />
            </div>
        </div>
    );
}

//TODO: add loader after some time

function PageWrapper({ children, currentStep, thisStep }: { children: ReactNode; currentStep: WizardPage; thisStep: WizardPage; }) {
    const direction = currentStep >= thisStep ? '-100%' : '100%';
    return (
        <motion.div
            initial={{ opacity: 1, x: direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: direction, transition: { duration: 2, ease: "easeOut" } }}
            transition={{ duration: 2.15, ease: "easeOut" }}

        >
            {children}
        </motion.div>
    );
}
