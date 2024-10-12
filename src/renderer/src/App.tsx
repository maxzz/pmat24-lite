import { SectionHeader } from "./components/1-header";
import { SectionMain } from "./components/2-main";
import { SectionFooter } from "./components/3-footer";
import { doSetFilesFromDropAtom } from "./store";
import { OnAppMount, WorldToReactListener } from "./xternal-to-main";
import { DropItDoc, Toaster } from "./ui";
import { UISymbolDefs } from "@ui/icons";
import { AppGlobalDialogs, AppGlobalShortcuts } from "./store/atoms/7-dialogs";
import { SpyAllIcons } from "./util-hooks";

export function App(): JSX.Element {
    return (<>
        <UISymbolDefs />
        {/* <SpyAllIcons includeSvgSymbols /> */}

        <div className="h-screen text-sm text-foreground bg-background grid grid-rows-[auto,1fr,auto] overflow-hidden"> {/* debug-screens */}
            <SectionHeader />
            <SectionMain />
            <SectionFooter />
        </div>

        <AppGlobalShortcuts />
        <AppGlobalDialogs />
        <Toaster />

        <DropItDoc doSetFilesFromDropAtom={doSetFilesFromDropAtom} />

        <WorldToReactListener />
        <OnAppMount />
    </>);
}

//TODO: add version request from main and DpAgent
//TODO: beforeunload handler to save changed files
