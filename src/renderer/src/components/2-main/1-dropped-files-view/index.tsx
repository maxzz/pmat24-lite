import { useAtomValue } from 'jotai';
import { filesContentAtom } from '@/store';
import { Card } from './3-file-card';
import { ButtonClear } from './2-button-clear';
import { SectionHeader } from './1-header';

export function DroppedFilesView() {
    const filesContent = useAtomValue(filesContentAtom);
    return (<>
        <div className="border-neutral-900/20 border rounded shadow-sm">
            <SectionHeader>
                <div className="flex items-center justify-between">
                    <div className="">Loaded content: {!filesContent.length && ' Drop It Here'}</div>
                    {!!filesContent.length && <ButtonClear />}
                </div>
            </SectionHeader>

            <div className="p-2 grid gap-2 grid-cols-[repeat(auto-fill,minmax(20ch,1fr))]">
                {filesContent.map((fileContent, idx) => (
                    <Card fileContent={fileContent} key={`${idx}=${fileContent.name}`} />
                ))}
            </div>
        </div>
    </>);
}
