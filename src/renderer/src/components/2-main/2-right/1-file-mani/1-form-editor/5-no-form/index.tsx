import { useState } from "react";
import { FormIdx } from "@/store/store-types";
import { Button } from "@/ui";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/ui/shadcn/select";

export function ButtonCreate() {
    const [selected, setSelected] = useState('');
    if (selected) {
        return null;
    }
    return (
        <Select onValueChange={(value)=> {console.log(value); setSelected(value)}}>
            <SelectTrigger className="px-2 w-max text-xs font-semibold gap-1">
                <SelectValue placeholder="Create a password change form" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>How to create form</SelectLabel>
                    <SelectItem className="text-xs" value="banana">Create from application</SelectItem>
                    <SelectItem className="text-xs" value="blueberry">Define form manually</SelectItem>
                    <SelectItem className="text-xs" value="apple">Create manual mode (Windows apps only)</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

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
