import { SectionHeader } from "./components/1-header";
import { SectionMain } from "./components/2-main";
import { SectionFooter } from "./components/3-footer";
import { UISymbolDefs } from "@ui/icons";
import { AppGlobals } from "./components/4-dialogs";

export function App(): JSX.Element {
    return (<>
        <UISymbolDefs />
        {/* <SpyAllIcons includeSvgSymbols /> */}

        <div className="h-screen text-sm text-foreground bg-background grid grid-rows-[auto,1fr,auto] overflow-hidden"> {/* debug-screens */}
            <SectionHeader />
            <SectionMain />
            <SectionFooter />
        </div>

        <AppGlobals />
    </>);
}

//TODO: add version request from main and DpAgent
//TODO: beforeunload handler to save changed files

//TODO: use inputFocusClasses from one location
//TODO: in files list: kbd up/down should simulate hover and by enter should select; selected item should be highlighted with a different color

//TODO: from all filenames remove sourrounding curly braces (BTW: this is breaking File Explorer sorting order)
//TODO: add feature to rename files with/without domain name prefix as PMIT does

//TODO: we need global toast ID to clean previous toast. This happens when we show toast and drop files but toast is still visible. see TestOpenFieldCatalog

//TODO: save pictures previews in separate folder

//12.09.24, files
    //TODO: combine file icons in separated by slash if forms are mixed (manual and normal)
    //TODO: add option to show only root and A/B/C folder and ignore other sub-folders

//12.11.24, field catalog
    //TODO: buttons are not stored in field catalog
    //TODO: buttons should not have dbname (it is useless, they don't have state to save)

//12.14.25, create new manifest
    //src/shell/xternal-to-renderer/7-napi-calls/4-get-window-mani.ts
    //TODO: define ManifestForWindowCreatorResult when result is object
    //TODO: error handling
    //TODO: test screenshots get/update for many open chrome windows and get content for active window with many other windows opened and controls

//12.15.25, scroll position
    //TODO: preserve scroll position - partially done
    //TODO: prevent dialog from closing when clicking outside of the dialog

    //TODO: when open mani chrome windows update sometimes goes forever - provide feedback to user and cancel the update button
