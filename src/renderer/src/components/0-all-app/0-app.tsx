import { type JSX } from "react";
import { UISymbolDefs } from "@ui/icons";
import { AppContent } from "./1-main";
import { AppGlobals } from "../4-dialogs";
import { useBeforeUnload } from "./2-before-unload";
//import { SpyAllIcons } from "@/utils";

export function App(): JSX.Element {
    useBeforeUnload();

    return (<>
        <UISymbolDefs />
        {/* <SpyAllIcons includeSvgSymbols /> */}
        <AppContent />
        <AppGlobals />
    </>);
}
