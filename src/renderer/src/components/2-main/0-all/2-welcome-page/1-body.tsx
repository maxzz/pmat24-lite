import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, filesAtom } from "@/store";
import { ButtonFilesPicker } from "./3-button-files-picker";
import { DontShowNext } from "./6-dont-show-next";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ListViewDemo } from "@/ui/local-ui/nun/ai-listview/0-list-view-demo4";
import { TextHoverEffect } from "@/ui";
import { IconHIDWoFrame } from "@/ui/icons";
import { WelcomeHeroTitle } from "./2-welcome-hero-title";

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

                            {/* <ListViewDemo /> */}
                            {/* <DontShowNext className="absolute left-0 bottom-0 p-2" /> */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionConfig >
    );
}

function OpenButtons() {
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);
    return (<>
        {allowHandleFiles && <ButtonFilesPicker />}
        <ButtonFilesPicker openAsFolder />

        <RecentFilesList />
    </>);
}

function RecentFilesList() {
    const hasRecent = false;
    return (<>
        {/* <div className="flex flex-col gap-1">
            <div className="font-semibold">
                Recently used folders:
            </div>
            <div className="flex flex-col gap-1">
                <div className="">
                    Folder 1 (placeholder)
                </div>
                <div className="">
                    Folder 2 (placeholder)
                </div>
            </div>
        </div> */}

        {hasRecent && (
            <div className="text-xs space-y-1">
                <div className="font-semibold">
                    Resently used folders:
                </div>
                <div className="">
                    Folder 1 (placeholder)
                </div>
                <div className="">
                    Folder 2 (placeholder)
                </div>
            </div>
        )}
    </>);
}


//TODO: add checkbox to hide welcome page next time
//TODO: more explanation about how start working with the app
//TODO: add menu to access the Welcome page
//TODO: add recent files list
