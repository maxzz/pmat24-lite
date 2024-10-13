import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, filesAtom } from "@/store";
import { ButtonFilesPicker } from "./2-button-files-picker";
import { DontShowNext } from "./3-dont-show-next";

export function WelcomePage() {
    const files = useAtomValue(filesAtom);
    const showWelcome = useSnapshot(appSettings.appUi.uiGeneral).showWelcome;

    if (!!files.length || !showWelcome) {
        return null;
    }

    return (
        <div className="relative h-full bg-muted-background flex flex-col items-center justify-center">
            <div className="text-2xl">
                Welcome to the app!
            </div>

            <ButtonFilesPicker />
            <ButtonFilesPicker openAsFolder />

            <DontShowNext className="absolute left-0 bottom-0 p-4" />
        </div>
    );
}

//TODO: add checkbox to hide welcome page next time
//TODO: more explanation about how start working with the app
//TODO: add menu to access the Welcome page
//TODO: add recent files list
