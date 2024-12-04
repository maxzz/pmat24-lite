import { FormIdx } from "@/store/manifest";
import { ButtonCreateFormSelector } from "@/components/4-dialogs";

export function NoFormTabContent({ formType }: { formType: FormIdx; }) {

    const isCpass = formType === FormIdx.cpass;
    const label = !isCpass
        ? "No login form"
        : <><span className="font-semibold">No</span>{' '}password change form</>;

    return (
        <div className="px-2 h-full flex flex-col gap-1">
            <div className="pt-1 text-xs select-none">
                {label}
            </div>

            {isCpass && (
                <ButtonCreateFormSelector
                    triggerLabel="Create a password change form"
                    subLabel="How to create form"
                />
            )}
        </div>
    );
}
