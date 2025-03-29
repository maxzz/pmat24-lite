import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { appSettings, filesAtom, rootDir } from "@/store";
import { WelcomeHeroTitle } from "./2-welcome-hero-title";
import { OpenButtons } from "./3-open-buttons";
import { RecentFilesList } from "./5-recent-files-list";
import { HIDLogoAnimation } from "./6-hid-logo-animation";
import { DontShowNext } from "./7-nun-dont-show-next";
// import { ListViewDemo } from "@/ui/local-ui/nun/ai-listview/0-list-view-demo4";

export function WelcomePage() {
    const files = useAtomValue(filesAtom);
    const { showWelcome, showWelcomeCheck } = useSnapshot(appSettings.appUi.uiGeneral);

    const { fpath } = useSnapshot(rootDir);

    // const showWelcomePage = showWelcome && !files.length;
    const showWelcomePage = showWelcome && !fpath.length;

    return (
        <MotionConfig transition={{ type: "spring", duration: .7 }}>

            <AnimatePresence>
                {showWelcomePage && (
                    <motion.div
                        className="absolute inset-0 bg-muted grid grid-rows-[1fr,auto,1fr] z-[21]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="row-start-2 relative size-full">
                            <CenterPart />
                        </div>

                        <div className="row-start-3 absolute inset-0">
                            <div className="p-2 size-full grid grid-cols-[1fr,auto,1fr]">
                                <div className="col-start-2 place-self-end">
                                    <RecentFilesList />
                                </div>
                            </div>

                            {showWelcomeCheck && (
                                <DontShowNext className="absolute left-0 bottom-0 p-2" />
                            )}
                            
                            <HIDLogoAnimation />
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </MotionConfig >
    );
}

function CenterPart() {
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);
    return (<>
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
            <WelcomeHeroTitle allowHandleFiles={allowHandleFiles} />
            <OpenButtons />
            {/* <ListViewDemo /> */}
        </div>
    </>);
}