import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { TestOpenFiles } from "./8-1-test-open-files";
import { TestOpenFieldCatalog } from "./8-2-test-open-field-catalog";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { TestCreateManifest } from "./7-1-create-mani";
import { TestCreatewithDrawer } from "./7-2-create-mani-w-drawer";
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
