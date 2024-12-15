import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, filesAtom } from "@/store";
import { ButtonFilesPicker } from "./2-button-files-picker";
import { DontShowNext } from "./3-dont-show-next";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ListViewDemo } from "@/ui/local-ui/nun/ai-listview/0-list-view-demo4";
import { TextHoverEffect } from "@/ui";

const titleStyle = {
    color: 'black',
    WebkitTextFillColor: 'transparent',
    WebkitTextStroke: '0.1px hsl(var(--foreground))',
    WebkitFontSmoothing: 'antialiased',
};

export function WelcomePage() {
    const files = useAtomValue(filesAtom);
    const showWelcome = useSnapshot(appSettings.appUi.uiGeneral).showWelcome;
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);

    const showWelcomePage = showWelcome && !files.length;
    const hasRecent = false;

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
                            <div className="text-2xl font-extrabold opacity-30 scale-y-125" style={titleStyle}>
                                {/* Password Manager Admin Tool */}
                                Welcome to the Password Manager Admin Tool
                            </div>

                            {/* <div className="h-24 [--yellow-500:#fff400] [--red-500:#ea3939] [--blue-500:#395eea] [--cyan-500:#39ead7]">
                                <TextHoverEffect text="Welcome to the Password Manager Admin Tool" duration={0.5} />
                            </div> */}

                            <div className="text-xs text-balance">
                                {allowHandleFiles
                                    ? "Open the file or folder containing the manifest files to start working with the application."
                                    : "Open the folder containing the manifest files to start working with the application."
                                }
                            </div>

                            {allowHandleFiles && <ButtonFilesPicker />}
                            <ButtonFilesPicker openAsFolder />

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

                            {/* <ListViewDemo /> */}

                            <DontShowNext className="absolute left-0 bottom-0 p-2" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionConfig >
    );
}

//TODO: add checkbox to hide welcome page next time
//TODO: more explanation about how start working with the app
//TODO: add menu to access the Welcome page
//TODO: add recent files list
