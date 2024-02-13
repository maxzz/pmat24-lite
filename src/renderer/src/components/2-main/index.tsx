import { Button } from '@/ui';
import { DroppedFilesView } from './1-dropped-files-view/4-dropped-files-view';
import { Versions } from '../versions-list';

export function SectionMain() {
    const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');
    return (
        <div className="p-4 flex flex-col">
            <div className="flex-1">
                <DroppedFilesView />
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={ipcHandle}>
                    Send IPC
                </Button>
                
                <Versions />
            </div>
        </div>
    );
}
