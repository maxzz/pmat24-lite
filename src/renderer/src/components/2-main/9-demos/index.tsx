import { Button } from '@/ui';
import { hasMain } from '@shared/ipc-client';
import { PanelHwndGrid } from './2-active-saw';
import { Versions } from './versions-list';

function sendPingPong(): void {
    return window.electron.ipcRenderer.send('ping');
}
function PingPongButton() {
    return (
        <Button variant="outline" onClick={sendPingPong}>
            Send IPC
        </Button>
    );
}

export function Demos() {
    return (
        <div>
            <PanelHwndGrid />

            <div className="flex items-center gap-2">
                {hasMain() && (
                    <PingPongButton />
                )}

                <Versions />
            </div>
        </div>
    );
}
