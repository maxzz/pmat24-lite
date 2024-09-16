import { FormIdx } from "@/store/manifest";
import { ButtonCreateFormSelector } from "@/components/4-dialogs";

export function NoFormTabContent({ formType }: { formType: FormIdx; }) {

    const isCpass = formType === FormIdx.cpass;
    const label = !isCpass
        ? "No login form"
        : (
            <div>
                <span className="text-foreground">
                    No
                </span>
                password change form
            </div>
        );

    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">

                <div className="px-4 text-xs text-mani-title select-none">
                    {label}
                </div>

                {isCpass && (
                    <ButtonCreateFormSelector
                        triggerLabel="Create a password change form"
                        subLabel="How to create form"
                    />
                )}

            </div>
        </div>
    );
}
