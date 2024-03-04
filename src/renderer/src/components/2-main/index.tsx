import { DroppedFilesView } from './9-demos/1-dropped-files-view';
import { Demos } from './9-demos';

export function SectionMain() {
    return (
        <div className="p-4 flex flex-col">
            <div className="flex-1">
                <DroppedFilesView />
            </div>

            <Demos />
        </div>
    );
}
