import { Button } from "@/ui";
import { SawHwndPropsGrid } from "./2-active-raw";
import { hasMain } from "@/xternal-to-main";
import { Versions } from "./versions-list";

export function Demos() {
    return (
        <div className="p-4 flex flex-col">

            <SawHwndPropsGrid />

            <div className="flex items-center gap-2">
                {hasMain() && (
                    <PingPongButton />
                )}

                <Versions />
            </div>
        </div>
    );
}

function PingPongButton() {
    return (
        <Button variant="outline" onClick={sendPingPong}>
            Send IPC
        </Button>
    );
}

function sendPingPong(): void {
    return window.electron.ipcRenderer.send('ping');
}
