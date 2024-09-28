import { useSetAtom } from "jotai";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { MainDropdownMenu } from "../1-main-menu";
import { Button } from "@/ui";
import { doOpenCreateDialogAtom, doOpenDrawerAtom } from "@/store/atoms/7-dialogs";
import { IconExPol02Fido, IconExPol01Face, IconExPol03Bluetooth, IconExPol04Proxy, IconExPol05Otp, IconExPol06Pin, IconExPol07Contactless, IconExPol08Smartcard, IconExPol09Fingerprint, IconExPol10Password } from "@/ui/icons/normal/extended-policy";
import { extPolicyIcons, extPolicyTokens } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls/4-ext-policies";

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

                {/* <IconExPol01Face className="size-5" />
                <IconExPol02Fido className="size-5" />
                <IconExPol03Bluetooth className="size-5" />
                <IconExPol04Proxy className="size-5" />
                <IconExPol05Otp className="size-5" />
                <IconExPol06Pin className="size-5" />
                <IconExPol07Contactless className="size-5" />
                <IconExPol08Smartcard className="size-5" />
                <IconExPol09Fingerprint className="size-5" />
                <IconExPol10Password className="size-5" /> */}

                {extPolicyTokens.map(
                    (token, idx) => {
                        const Icon = extPolicyIcons[token.icon];
                        return <Icon key={idx} className="size-6" />;
                    }
                )}

            </div>

            <ThemeSwitch />
        </div>
    );
}
