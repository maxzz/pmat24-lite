import { type MouseEvent } from "react";
import { DebugMainHeader } from "../1-header-for-debug";
import { SectionMain } from "../2-main";
import { SectionFooter } from "../3-footer";
import { appSettings } from "@/store/9-ui-state";

export function AppContent() {
    return (<>
        <div className={topClasses} onContextMenu={preventContextMenu}>
            <DebugMainHeader />
            <SectionMain />
            <SectionFooter />
        </div>
    </>);
}

function preventContextMenu(event: MouseEvent<HTMLDivElement>) {
    if (!appSettings.appUi.uiAdvanced.blockGlobalCtxMenu) {
        return;
    }

    // for now let's block all context menus
    // const active = document.activeElement;
    // if (active?.tagName === 'INPUT') {
    //     return;
    // }

    event.preventDefault();
}

const topClasses = "h-screen text-sm text-foreground bg-background grid grid-rows-[auto_1fr_auto] overflow-hidden debug-screens"; {/* debug-screens */ }
