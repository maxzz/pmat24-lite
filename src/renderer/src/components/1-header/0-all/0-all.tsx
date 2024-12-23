import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { MainDropdownMenu } from "../../2-main/1-left/1-header/1-menu-main";
import { Button } from "@/ui";
import { doOpenCreateDialogAtom, doOpenDrawerAtom } from "@/store/atoms/7-dialogs";
import { TestOpenFiles } from "./8-1-test-open-files";
import { TestOpenFieldCatalog } from "./8-2-test-open-field-catalog";
import { appSettings } from "@/store";
// import { TestPolicyIcons } from "./8-test-policy-icons";

export function SectionHeader() {
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    const doOpenDrawer = useSetAtom(doOpenDrawerAtom);

    const { showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);

    if (!showUiHeader) {
        return <div />;
    }

    return (
        <div className="px-4 py-2 bg-muted/20 border-border/50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MainDropdownMenu />

                <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenCreateDialog(true)}>
                    Create mani
                </Button>

                <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenDrawer(true)}>
                    Create
                </Button>

                <TestOpenFiles />
                <TestOpenFieldCatalog />

                {/* <TestPolicyIcons /> */}
            </div>

            <ThemeSwitch />
        </div>
    );
}
