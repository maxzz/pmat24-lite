import { type JSX } from "react";
import { UISymbolDefs } from "@ui/icons";
import { AppContent } from "./1-main";
import { AppGlobals } from "../4-dialogs";

export function App(): JSX.Element {
    return (<>
        <UISymbolDefs />
        {/* <SpyAllIcons includeSvgSymbols /> */}
        <AppContent />
        <AppGlobals />
    </>);
}
