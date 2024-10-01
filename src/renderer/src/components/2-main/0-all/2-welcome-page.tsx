import { appSettings, filesAtom } from "@/store";
import { Button, Checkbox, Label } from "@/ui";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";

export function WelcomePage() {
    const files = useAtomValue(filesAtom);
    const showWelcome = useSnapshot(appSettings.appUi.uiGeneralState).showWelcome;

    if (!!files.length || !showWelcome) {
        return null;
    }

    return (
        <div className="relative h-full bg-muted-background flex flex-col items-center justify-center">
            <div className="text-2xl">
                Welcome to the app!
            </div>

            <Button className="mt-4">
                Open a file
            </Button>

            <Label className="absolute left-0 bottom-0 p-4 flex items-center gap-1">
                <Checkbox
                    className="size-4"
                    checked={showWelcome}
                    onClick={() => appSettings.appUi.uiGeneralState.showWelcome = !appSettings.appUi.uiGeneralState.showWelcome}
                />
                Don't show this page next time
            </Label>
        </div>
    );
}

//TODO: add checkbox to hide welcome page next time
//TODO: more explanation about how start working with the app
//TODO: add menu to access the Welcome page
//TODO: add recent files list
