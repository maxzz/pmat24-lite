import { useAtomValue } from 'jotai';
import { filesContentAtom } from '@/store';
import { Card } from './3-file-card';
import { ButtonClear } from './2-button-clear';
import { SectionHeader } from './1-header';

export function DroppedFilesView() {
    const filesContent = useAtomValue(filesContentAtom);
    return (<>
        <SectionHeader>
            <div className="h-9 flex items-center justify-between">
                <div>
                    {filesContent.length ? 'Loaded content' : 'Drop files here'}
                </div>

                {!!filesContent.length && (
                    <ButtonClear />
                )}
            </div>
        </SectionHeader>

        <div className="mt-4 grid gap-2 grid-cols-[repeat(auto-fill,minmax(20ch,1fr))]">
            {filesContent.map((fileContent, idx) => (
                <Card fileContent={fileContent} key={`${idx}=${fileContent.name}`} />
            ))}
        </div>
    </>);
}
