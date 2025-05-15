import { type MouseEvent } from "react";
import { SectionHeader } from "../1-header";
import { SectionMain } from "../2-main";
import { SectionFooter } from "../3-footer";
import { appSettings } from "@/store";

export function AppContent() {
    return (<>
        <div className={topClasses} onContextMenu={preventContextMenu}>
            <SectionHeader />
            <SectionMain />
            <SectionFooter />
        </div>
    </>);
}

function preventContextMenu(e: MouseEvent<HTMLDivElement>) {
    if (!appSettings.appUi.uiAdvanced.blockGlobalCtxMenu) {
        return;
    }
    const active = document.activeElement;
    if (active?.tagName === 'INPUT') {
        return;
    }
    e.preventDefault();
}

const topClasses = "h-screen text-sm text-foreground bg-background grid grid-rows-[auto,1fr,auto] overflow-hidden"; {/* debug-screens */ }
