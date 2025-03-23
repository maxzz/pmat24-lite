import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { appSettings, filesAtom, rootDir } from "@/store";
import { WelcomeHeroTitle } from "./2-welcome-hero-title";
import { OpenButtons } from "./3-open-buttons";
import { HIDLogoAnimation } from "./5-hid-logo-animation";
import { DontShowNext } from "./6-dont-show-next";

export function WelcomePage() {
    const files = useAtomValue(filesAtom);
    const showWelcome = useSnapshot(appSettings.appUi.uiGeneral).showWelcome;
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);

    const { rpath } = useSnapshot(rootDir);

    // const showWelcomePage = showWelcome && !files.length;
    const showWelcomePage = showWelcome && !rpath.length;

    return (
        <MotionConfig transition={{ type: "spring", duration: .7 }}>
            <AnimatePresence>

                {showWelcomePage && (
                    <motion.div
                        className="absolute inset-0 bg-muted z-[21]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">

                            <WelcomeHeroTitle allowHandleFiles={allowHandleFiles} />
                            <OpenButtons />
                            <HIDLogoAnimation />
                            {/* <DontShowNext className="absolute left-0 bottom-0 p-2" /> */}

                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </MotionConfig >
    );
}
