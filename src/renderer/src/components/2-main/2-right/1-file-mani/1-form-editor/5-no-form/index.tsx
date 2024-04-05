import { FormIdx } from "@/store/store-types";
import { Button } from "@/ui";

import { ButtonCreate } from "./2-create-cpass/ButtonCreate";

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
                    <Button className="ml-2" onClick={() => alert('TODO: create password change form')}>
                        Create a password change form
                    </Button>
                )}

                <ButtonCreate />
            </div>

        </div>
    );
}
