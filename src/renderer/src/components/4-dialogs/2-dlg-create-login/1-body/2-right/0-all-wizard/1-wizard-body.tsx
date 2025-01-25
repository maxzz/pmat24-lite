import { type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion, MotionConfig } from "framer-motion"; //https://codesandbox.io/p/sandbox/framer-motion-image-gallery-pqvx3
import { LeftPanelProgress, WizardBottomButtons } from "../../8-create-ui";
import { newManiCtx, WizardPage } from "../../9-new-mani-ctx";
import { Page1AppsBody } from "../1-page-apps";
import { Page2FieldsBody } from "../2-page-fields";
import { Page3OptionsBody } from "../3-page-options";
import { Page4SaveBody } from "../4-page-save";

export function WizardBody() {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const [page, direction] = useAtomValue(newManiCtx.pageAndDirectionAtom);
    return (
        <div className="h-full grid grid-cols-[auto_1fr]">
            <LeftPanelProgress className="p-4 bg-muted border-r border-foreground/20" />

            <MotionConfig transition={TRANSITION}>
                <div className="h-full grid grid-rows-[1fr_auto] overflow-hidden">

                    <div className="flex">
                        <AnimatePresence initial={false} custom={direction}>
                            {currentStep === WizardPage.apps && <PageWrapper direction={direction} currentStep={currentStep} thisStep={WizardPage.apps} key={WizardPage.apps}><Page1AppsBody /></PageWrapper>}
                            {currentStep === WizardPage.fields && <PageWrapper direction={direction} currentStep={currentStep} thisStep={WizardPage.fields} key={WizardPage.fields}><Page2FieldsBody /></PageWrapper>}
                            {currentStep === WizardPage.options && <PageWrapper direction={direction} currentStep={currentStep} thisStep={WizardPage.options} key={WizardPage.options}><Page3OptionsBody /></PageWrapper>}
                            {currentStep === WizardPage.save && <PageWrapper direction={direction} currentStep={currentStep} thisStep={WizardPage.save} key={WizardPage.save}><Page4SaveBody /></PageWrapper>}
                        </AnimatePresence>
                    </div>

                    {/* <ButtonCreateFormSelector triggerLabel="Create new manifest" /> */}

                    <WizardBottomButtons className="my-4" />
                </div>
            </MotionConfig>
        </div>
    );
}

const TRANSITION = {
    type: 'spring',
    bounce: 0.05,
    duration: 0.3,
};

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

//TODO: add loader after some time

function PageWrapper({ children, currentStep, thisStep, direction }: { children: ReactNode; currentStep: WizardPage; thisStep: WizardPage; direction: number; }) {
    // const direction = currentStep >= thisStep ? '-100%' : '100%';
    return (
        <motion.div
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            // transition={{
            //     x: { type: "spring", stiffness: 300, damping: 30 },
            //     opacity: { duration: 2.2 }
            // }}
            className="w-full shrink-0"

        // initial={{ opacity: 1, x: direction }}
        // animate={{ opacity: 1, x: 0 }}
        // exit={{ opacity: 1, x: direction, transition: { duration: 2, ease: "easeOut" } }}
        // transition={{ duration: 2.15, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
