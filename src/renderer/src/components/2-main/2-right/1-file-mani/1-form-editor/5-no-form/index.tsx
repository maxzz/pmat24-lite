import { FormIdx } from "@/store/store-types";
import { ButtonCreateFormSelector } from "./2-create-cpass";

export function NoForm({ formType }: { formType: FormIdx; }) {
    const label = formType === FormIdx.login ? "No login form" : "No password change form";
    const isCpass = formType === FormIdx.cpass;
    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <div className="px-4 text-xs text-mani-title dark:text-mani-title/50 select-none">
                    {label}
                </div>

                {isCpass && (
                    <ButtonCreateFormSelector triggerLabel="Create a password change form" subLabel="How to create form" />
                )}
            </div>
        </div>
    );
}
