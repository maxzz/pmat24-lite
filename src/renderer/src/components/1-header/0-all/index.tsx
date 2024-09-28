import { useSetAtom } from "jotai";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { MainDropdownMenu } from "../1-main-menu";
import { Button } from "@/ui";
import { doOpenCreateDialogAtom, doOpenDrawerAtom } from "@/store/atoms/7-dialogs";
import { extPolicyIcons, extPolicyTokens } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls/4-ext-policies";
import { ExtPolicySelect } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls/4-ext-policies/1-input-select";

export function SectionHeader() {
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    const doOpenDrawer = useSetAtom(doOpenDrawerAtom);

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

                {extPolicyTokens.map(
                    (token, idx) => {
                        const Icon = extPolicyIcons[token.icon];
                        return <Icon key={idx} className="size-6" />;
                    }
                )}

                <ExtPolicySelect />

            </div>

            <ThemeSwitch />
        </div>
    );
}
