import { SectionHeader } from "./components/1-header";
import { SectionMain } from "./components/2-main";
import { SectionFooter } from "./components/3-footer";
import { UISymbolDefs } from "@ui/icons";
import { AppGlobals } from "./components/4-dialogs";
import { ListViewDemo } from "./components/4-dialogs/4-field-catalog/ai/list-view-demo4";

export function App(): JSX.Element {
    return (<>
        <UISymbolDefs />
        {/* <SpyAllIcons includeSvgSymbols /> */}

        <div className="h-screen text-sm text-foreground bg-background grid grid-rows-[auto,1fr,auto] overflow-hidden"> {/* debug-screens */}
            <SectionHeader />
            {/* <SectionMain /> */}
            <ListViewDemo />
            <SectionFooter />
        </div>

        <AppGlobals />
    </>);
}

//TODO: add version request from main and DpAgent
//TODO: beforeunload handler to save changed files

//TODO: use inputFocusClasses from one location
//TODO: in files list: kbd up/down should simulate hover and by enter should select; selected item should be highlighted with a different color
