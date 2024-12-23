import { ResizableABPanels } from './3-middle';
import { WelcomePage } from '../2-welcome-page';

export function SectionMain() {
    return (
        <div className="relative bg-muted overflow-hidden">
            <WelcomePage />
            <ResizableABPanels />
        </div>
    );
}
