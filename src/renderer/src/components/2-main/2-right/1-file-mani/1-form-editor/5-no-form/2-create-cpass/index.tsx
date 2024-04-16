import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/ui/shadcn/select";

export function ButtonCreate() {
    const [selected, setSelected] = useState('');
    if (selected) {
        return null;
    }
    return (
        <Select onValueChange={(value) => { console.log(value); setSelected(value); }}>
            <SelectTrigger className="px-2 w-max text-xs font-semibold gap-1">
                <SelectValue placeholder="Create a password change form" />
            </SelectTrigger>

            <SelectContent align="center">
                <SelectGroup>
                    <SelectLabel>How to create form</SelectLabel>
                    <SelectItem className="text-xs" value="banana">Create from website or Windows application</SelectItem>
                    <SelectItem className="text-xs" value="blueberry">Define form manually for website</SelectItem>
                    <SelectItem className="text-xs" value="apple">Create manual mode (for Windows apps only)</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
