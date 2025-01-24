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

            <div className="h-full grid grid-rows-[1fr_auto]">
                <AnimatePresence initial={false} mode="wait">
                    {currentStep === WizardPage.apps && <PageWrapper><Page1AppsBody /></PageWrapper>}
                    {currentStep === WizardPage.fields && <PageWrapper><Page2FieldsBody /></PageWrapper>}
                    {currentStep === WizardPage.options && <PageWrapper><Page3OptionsBody /></PageWrapper>}
                    {currentStep === WizardPage.save && <PageWrapper><Page4SaveBody /></PageWrapper>}
                </AnimatePresence>

                {/* <ButtonCreateFormSelector triggerLabel="Create new manifest" /> */}

                <WizardBottomButtons className="my-4" />
            </div>
        </div>
    );
}

//TODO: add loader after some time

function PageWrapper({ children }: { children: ReactNode; }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {children}
        </motion.div>
    );
}
