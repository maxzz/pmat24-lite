import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { doOpenCreateDialogAtom, doOpenDrawerAtom } from "@/store/atoms/7-dialogs";
import { TestOpenFiles } from "./8-1-test-open-files";
import { TestOpenFieldCatalog } from "./8-2-test-open-field-catalog";
import { Button } from "@/ui";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
// import { TopMainDropdownMenu } from "./1-nun-old-main-menu-all";
// import { TestPolicyIcons } from "./8-3-test-policy-icons";

export function SectionHeader() {
    
    const { showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);
    if (!showUiHeader) {
        return <div />;
    }

    return (
        <div className="px-4 py-2 bg-muted/20 border-border/50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
                {/* <TopMainDropdownMenu /> */}

                <TestCreateManifest />

                <TestCreatewithDrawer />


                <TestOpenFiles />
                <TestOpenFieldCatalog />

                {/* <TestPolicyIcons /> */}
            </div>

            <ThemeSwitch />
        </div>
    );
}

function TestCreateManifest() {
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenCreateDialog(true)}>
            Create mani
        </Button>
    );
}

function TestCreatewithDrawer() {
    const doOpenDrawer = useSetAtom(doOpenDrawerAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenDrawer(true)}>
            Create
        </Button>
    );
}
