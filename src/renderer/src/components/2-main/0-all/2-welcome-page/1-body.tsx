import { useSnapshot } from "valtio";
import { motion, MotionConfig } from "motion/react";
import { appSettings, rootDir } from "@/store";
import { WelcomeHeroTitle } from "./2-welcome-hero-title";
import { OpenButtons } from "./3-open-buttons";
import { RecentFilesList } from "./5-recent-files-list";
import { HIDLogoAnimation } from "./6-hid-logo-animation";
import { DontShowNext } from "./nun/27-nun-dont-show-next";
// import { ListViewDemo } from "@/ui/local-ui/nun/ai-listview/0-list-view-demo4";
import { StarTest } from "./nun/1-star-test";

/**
 * Don't use AnimatePresence and exit animation.
 * This page should go away immediately otherwise tree item selection will be blocked for some time.
 * @returns 
 */
export function WelcomePage() {

    const { showWelcome, showWelcomeCheck } = useSnapshot(appSettings.appUi.uiGeneral);
    const { fpath } = useSnapshot(rootDir);
    const showWelcomePage = showWelcome && !fpath.length;

    return (
        <MotionConfig transition={{ type: "spring", duration: .7 }}>
            {showWelcomePage && (
                <motion.div
                    className="absolute inset-0 bg-muted grid grid-rows-[1fr,auto,1fr] z-[21]"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <HIDLogoAnimation className="row-start-1 absolute right-0.5 top-1 p-1.5 w-12" />

                    <div className="row-start-2 relative size-full">
                        <CenterPart />
                    </div>

                    <div className="row-start-3 absolute inset-0">
                        <Recent />

                        {showWelcomeCheck && (
                            <DontShowNext className="absolute left-0 bottom-0 p-2" />
                        )}
                    </div>

                    {/* <StarTest /> */}
                </motion.div>
            )}
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

function Recent() {
    return (<>
        <div className="p-2 size-full grid grid-cols-[1fr,auto,1fr]">
            <div className="col-start-2 place-self-end">
                <RecentFilesList />
            </div>
        </div>
    </>);
}

