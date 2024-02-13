import { useAtomValue } from 'jotai';
import { filesContentAtom } from '@/store';
import { Button } from '@/ui';
import { Versions } from '../versions-list';
import { DroppedFilesView } from './1-dropped-files-view';

// function DroppedFiles() {
//     const filesContent = useAtomValue(filesContentAtom);
//     return (
//         <div className="">
//             Dropped files

//             {filesContent.map((fileContent, idx) => (
//                 <Card fileContent={fileContent} key={`${idx}=${fileContent.name}`} />
//             ))}

//         </div>
//     );
// }

export function SectionMain() {
    const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');
    return (
        <div className="p-4">
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={ipcHandle}>Send IPC</Button>
                <Versions />
            </div>
            <DroppedFilesView />
        </div>
    );
}
