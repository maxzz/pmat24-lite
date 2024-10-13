import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, filesAtom } from "@/store";
import { ButtonFilesPicker } from "./2-button-files-picker";
import { DontShowNext } from "./3-dont-show-next";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

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

    // if (!showWelcomePage) {
    //     return null;
    // }

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
                            <div className="text-2xl font-extrabold opacity-30" style={titleStyle}>
                                {/* Password Manager Admin Tool */}
                                Welcome to the Password Manager Admin Tool
                            </div>

                            {allowHandleFiles
                                ? 'Open a file or folder to start working with the app.'
                                : 'Open a folder to start working with the app.'
                            }

                            {allowHandleFiles && <ButtonFilesPicker />}
                            <ButtonFilesPicker openAsFolder />

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

                            <DontShowNext className="absolute left-0 bottom-0 p-4" />
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
