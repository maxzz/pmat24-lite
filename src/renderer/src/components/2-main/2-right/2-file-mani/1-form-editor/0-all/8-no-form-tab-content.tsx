import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { ButtonCreateFormSelector } from "@/components/4-dialogs/2-dlg-create-login/2-dlg-w-screenshots/8-create-ui";

export function NoFormTabContent({ formType, className, ...rest }: { formType: FormIdx; } & ComponentPropsWithoutRef<'div'>) {

    const isCpass = formType === FormIdx.cpass;
    const label = !isCpass
        ? "No login form"
        : <><span className="font-semibold">No</span>{' '}password change form</>;

    return (
        <div className={classNames("px-2 h-full flex flex-col gap-1", className)} {...rest}>
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
