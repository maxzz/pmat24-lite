import { SectionHeader } from "./components/1-header";
import { SectionMain } from "./components/2-main";
import { SectionFooter } from "./components/3-footer";
import { doSetFilesFromDropAtom } from "./store";
import { OnAppMount, WorldToReactListener } from "./xternal-to-main";
import { DropItDoc, Toaster } from "./ui";
import { UISymbolDefs } from "@ui/icons";
import { AppGlobalShortcuts } from "./store/atoms/8-dialogs";

export function App(): JSX.Element {
    return (<>
        <UISymbolDefs />

        <div className="h-screen text-sm text-foreground bg-background grid grid-rows-[auto,1fr,auto] overflow-hidden">
            <SectionHeader />
            <SectionMain />
            <SectionFooter />
        </div>

        <AppGlobalShortcuts />
        <DropItDoc doSetFilesFromDropAtom={doSetFilesFromDropAtom} />
        <WorldToReactListener />
        <OnAppMount />
        <Toaster />
    </>);
}
