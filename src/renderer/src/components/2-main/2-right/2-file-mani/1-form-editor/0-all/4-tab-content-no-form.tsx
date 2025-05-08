import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { Button } from "@/ui";
import { open_SawMonitorForCpassAtom } from "@/store";

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

function ButtonCreateCpassForm() {
    const openDlg = useSetAtom(open_SawMonitorForCpassAtom);
    return (
        <Button variant="default" size="xs" className="px-2 w-max justify-start" onClick={openDlg}>
            Create password change form
        </Button>
    );
}
