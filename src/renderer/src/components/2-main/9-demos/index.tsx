import { Button } from '@/ui';
import { DroppedFilesView } from './1-dropped-files-view';
import { PanelHwndGrid } from './2-active-saw';
import { hasMain } from '@/xternal-to-main';
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
        <div className="p-4 flex flex-col">
            <div className="flex-1">
                <DroppedFilesView />
            </div>

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
