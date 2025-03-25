import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { TestOpenFiles } from "./8-1-test-open-files";
import { TestOpenFieldCatalog } from "./8-2-test-open-field-catalog";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { TestCreateManiWithAppsList } from "./7-1-create-mani-w-apps-list";
import { TestCreateWithSnapshots } from "./7-2-create-mani-w-snapshots";
import { TestCreateWithSaw } from "./7-3-create-mani-w-saw";
import { TestCloseFolder } from "./7-4-close-folder";
// import { TopMainDropdownMenu } from "./1-nun-old-main-menu-all";
// import { TestPolicyIcons } from "./8-3-test-policy-icons";

export function SectionHeader() {

    const { showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);
    if (!showUiHeader) {
        return <div />;
    }

    return (
        <div className="px-2 py-2 bg-muted/20 border-border/50 border-b flex items-center justify-between">
            <div className="flex items-center flex-wrap gap-2">
                {/* <TopMainDropdownMenu /> */}

                <TestCreateManiWithAppsList />
                <TestCreateWithSnapshots />

                <TestOpenFieldCatalog />

                <TestOpenFiles />
                <TestCloseFolder />

                <TestCreateWithSaw />

                {/* <TestPolicyIcons /> */}
            </div>

            <ThemeSwitch />
        </div>
    );
}
