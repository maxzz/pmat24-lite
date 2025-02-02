import { type ReactNode } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion, MotionConfig } from "framer-motion"; //https://codesandbox.io/p/sandbox/framer-motion-image-gallery-pqvx3 //tm: https://codesandbox.io/p/sandbox/framer-motion-image-gallery-forked-cr347p //https://motion-primitives.com/docs/popover
import * as D from "@/ui/shadcn/dialog";
import { LeftPanelProgress, WizardBottomButtons } from "../../8-create-ui";
import { newManiCtx, WizardPage } from "../../0-new-mani-ctx";
import { Page1AppsBody } from "../2-pages/1-page-apps";
import { Page2FieldsBody } from "../2-pages/2-page-fields";
import { Page3OptionsBody } from "../2-pages/3-page-options";
import { Page4SaveBody } from "../2-pages/4-page-save";
import { doOpenDrawerAtom } from "@/store";

export function WizardBody() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (
        <div className="h-full">
            <D.DialogHeader className="relative text-base font-bold flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-4">New manifest</div>
                </D.DialogTitle>

                <D.DialogCloseButton onClick={() => setDoOpenDrawer(false)} tabIndex={-1} />
            </D.DialogHeader>

            <div className="h-full grid grid-cols-[auto_1fr]">
                <LeftPanelProgress className="p-4 bg-muted border-r border-foreground/20" />
                <Pages />
            </div>

            <WizardBottomButtons className="my-4" />
        </div>
    );
}

function Pages() {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const [page, direction] = useAtomValue(newManiCtx.pageAndDirectionAtom);
    return (
        <MotionConfig transition={TRANSITION}>
            <div className="h-full grid grid-rows-[1fr_auto] overflow-hidden">

                <div className="flex">
                    <AnimatePresence initial={false} custom={direction} mode="wait">

                        {currentStep === WizardPage.apps &&
                            <PageWrapper direction={direction} currentStep={currentStep} thisStep={WizardPage.apps} key={WizardPage.apps}>
                                <Page1AppsBody />
                            </PageWrapper>}

                        {currentStep === WizardPage.fields &&
                            <PageWrapper direction={direction} currentStep={currentStep} thisStep={WizardPage.fields} key={WizardPage.fields}>
                                <Page2FieldsBody />
                            </PageWrapper>}

                        {currentStep === WizardPage.options &&
                            <PageWrapper direction={direction} currentStep={currentStep} thisStep={WizardPage.options} key={WizardPage.options}>
                                <Page3OptionsBody />
                            </PageWrapper>}

                        {currentStep === WizardPage.save &&
                            <PageWrapper direction={direction} currentStep={currentStep} thisStep={WizardPage.save} key={WizardPage.save}>
                                <Page4SaveBody />
                            </PageWrapper>}

                    </AnimatePresence>
                </div>

                {/* <ButtonCreateFormSelector triggerLabel="Create new manifest" /> */}

                {/* <WizardBottomButtons className="my-4" /> */}
            </div>
        </MotionConfig>
    );
}

const TRANSITION = {
    type: 'spring',
    // bounce: 0.05,
    // duration: 0.3,
    stiffness: 300,
    damping: 30,
};

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 150 : -150,
            opacity: 1
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
            x: direction < 0 ? 150 : -150,
            opacity: 1,
            transition: {
                duration: 0
            }
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
