import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { ButtonCreateCpassForm, ButtonCreateFormSelector } from "@/components/4-dialogs/2-dlg-create-login/7-nun-dlg-w-screenshots/8-create-ui";

export function TabContent_NoForm({ formType, className, ...rest }: { formType: FormIdx; } & ComponentPropsWithoutRef<'div'>) {

    const thisIsCpass = formType === FormIdx.cpass;
    const label = !thisIsCpass
        ? "No login form"
        : <><span className="font-semibold">No</span>{' '}password change form</>;

    return (
        <div className={classNames("px-2 h-full flex flex-col gap-1", className)} {...rest}>
            <div className="pt-1 text-xs select-none">
                {label}
            </div>

            {/* {thisIsCpass && (
                <ButtonCreateFormSelector
                    triggerLabel="Create a password change form"
                    subLabel="How to create form"
                />
            )} */}

            {thisIsCpass && (
                <ButtonCreateCpassForm />
            )}
        </div>
    );
}
