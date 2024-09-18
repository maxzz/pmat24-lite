import { useAtomValue } from 'jotai';
import { filesAtom } from '@/store';
import { ResizableABPanels } from '../3-middle';

function WelcomePage() {
    const files = useAtomValue(filesAtom);
    if (files.length === 0) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-2xl">
                    Welcome to the app!
                </div>
            </div>
        );
    }
    return null;
}

export function SectionMain() {
    return (
        <div className="mt-2 bg-muted overflow-hidden">
            <WelcomePage />
            <ResizableABPanels />
        </div>
    );
}
