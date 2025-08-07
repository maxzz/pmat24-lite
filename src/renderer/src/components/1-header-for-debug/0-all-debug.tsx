import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { TestOpenFiles } from "./8-1-test-open-files";
import { TestOpenFieldCatalog } from "./8-2-test-open-field-catalog";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { TestCreateWithSaw, TestCreateWithSawForCpass } from "./7-3-create-mani-w-saw";
import { TestCloseFolder } from "./7-4-close-folder";
import { L_PanelMenuTrigger } from "@/components/2-main/1-left/1-header/1-menu-main";
import { TestDeleteCpass, TestDeleteFile } from "./8-3-test-delete-file";
import { TestManiName } from "./8-4-test-mani-name";
import { TestAboutDialog } from "./6-about-dlg";
// import { TestCreateManiWithAppsList } from "./7-1-create-mani-w-apps-list";
// import { TestCreateWithSnapshots } from "./7-2-create-mani-w-snapshots";
// import { TopMainDropdownMenu } from "./1-nun-old-main-menu-all";
// import { TestPolicyIcons } from "./8-3-test-policy-icons";

export function DebugMainHeader() {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);

    const { showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);
    if (!showUiHeader) {
        return <div />;
    }

    return (
        <div className="px-2 py-2 bg-muted/20 border-border/50 border-b flex items-center justify-between gap-x-4">
            <div className="flex items-center flex-wrap gap-2">
                {/* <TopMainDropdownMenu /> */}

                {/* <TestCreateManiWithAppsList />
                <TestCreateWithSnapshots /> */}

                {fcAllowed && <TestOpenFieldCatalog />}

                <TestOpenFiles />
                <TestCloseFolder />

                <L_PanelMenuTrigger />

                <TestCreateWithSaw />
                {/* <TestCreateWithSawForCpass /> */}

                <TestDeleteFile />
                <TestDeleteCpass />

                {/* <TestAboutDialog /> */}
                {/* <TestManiName /> */}

                {/* <div className="w-full flex items-center gap-2">
                    <TestPolicyIcons />
                </div> */}
            </div>

            <ThemeSwitch heightClasses="h-7" />
        </div>
    );
}
