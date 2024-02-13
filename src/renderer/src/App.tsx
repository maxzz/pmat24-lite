import { SectionHeader } from "./components/1-header";
import { SectionMain } from "./components/2-main";
import { SectionFooter } from "./components/3-footer";
import { doDroppedFilesAtom } from "./store";
import { DropItDoc } from "./ui";
import { UISymbolDefs } from "@ui/icons";

export function App(): JSX.Element {
    return (<>
        <UISymbolDefs />

        <div className="dark h-screen text-sm text-foreground bg-background grid grid-rows-[auto,1fr,auto]">
            <SectionHeader />
            <SectionMain />
            <SectionFooter />
        </div>

        <DropItDoc doDroppedFilesAtom={doDroppedFilesAtom} />
    </>);
}
