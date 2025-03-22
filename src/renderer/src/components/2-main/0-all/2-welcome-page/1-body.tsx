import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, filesAtom } from "@/store";
import { DontShowNext } from "./6-dont-show-next";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { IconHIDWoFrame } from "@/ui/icons";
import { WelcomeHeroTitle } from "./2-welcome-hero-title";
import { OpenButtons } from "./3-open-buttons";

export function WelcomePage() {
    const files = useAtomValue(filesAtom);
    const showWelcome = useSnapshot(appSettings.appUi.uiGeneral).showWelcome;
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);

    const showWelcomePage = showWelcome && !files.length;

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
                            <IconHIDWoFrame className="absolute right-0.5 bottom-0 p-1.5 w-12 text-border rounded" />

                            {/* <DontShowNext className="absolute left-0 bottom-0 p-2" /> */}
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </MotionConfig >
    );
}
