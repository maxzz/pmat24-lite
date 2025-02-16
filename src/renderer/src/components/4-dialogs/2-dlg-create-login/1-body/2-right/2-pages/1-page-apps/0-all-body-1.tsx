import { WizardPage } from "../../../0-new-mani-ctx";
import { Checkbox, PositionStorage, PreserveScrollArea } from "@/ui";
import { WizardPageHeader } from "../../../8-create-ui";
import { AppsGrid } from "./1-apps-grid";
import { ButtonReloadApps } from "./2-button-refresh-apps";

// const storageSession: PositionStorage = {
//     getTop: () => sessionStorage.getItem("sessionStorage"),
//     setTop: (top: number) => sessionStorage.setItem("sessionStorage", top.toString()),
// };

// const storageSession: PositionStorage & { pos: string; } = {
//     pos: '0',
//     getTop: () => storageSession.pos,
//     setTop: (top: number) => storageSession.pos = top.toString(),
// };

function createSessionStorage(name: string): PositionStorage {
    const storage: PositionStorage = {
        getTop: () => localStorage.getItem(name),
        setTop: (top: number) => localStorage.setItem(name, top.toString()),
    };
    return storage;
}

function createVarStorage(): PositionStorage {
    const rv: PositionStorage & { pos: string; } = {
        pos: '0',
        getTop: () => rv.pos,
        setTop: (top: number) => rv.pos = top.toString(),
    };
    return rv;
}

const storageSession = createVarStorage(); 

export function Page1AppsBody() {
    return (
        <div className="h-full text-xs grid grid-rows-[auto,1fr,auto]">
            <div className="flex items-center justify-between gap-2">
                <WizardPageHeader page={WizardPage.apps} />

                <ButtonReloadApps />
            </div>

            <div className="relative size-full">
                <div className="absolute inset-3">
                    <PreserveScrollArea className="px-2 py-1 size-full bg-muted/50 border border-border rounded-md" fullHeight fixedWidth storage={storageSession}>
                        <AppsGrid />
                    </PreserveScrollArea>
                </div>
            </div>

            <div className="px-3 pb-3 flex items-center  gap-2">
                <Checkbox className="" checked={true} />
                Define manifest content manually
            </div>
        </div>
    );
}

//TODO: switch storage to atom and reset on dialog close
//TODO: long ops feedback
