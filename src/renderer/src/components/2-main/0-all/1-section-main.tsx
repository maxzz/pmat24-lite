import { ResizableABPanels } from './1-middle';
import { WelcomePage } from './2-welcome-page/2-welcome-page';

export function SectionMain() {
    return (
        <div className="mt-2 bg-muted overflow-hidden">
            <WelcomePage />
            <ResizableABPanels />
        </div>
    );
}
