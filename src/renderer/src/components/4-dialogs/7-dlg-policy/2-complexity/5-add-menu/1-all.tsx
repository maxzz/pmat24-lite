import { useSetAtom } from "jotai";
import { PolicyDlgConv, UpdateExplanationAtom } from "../../0-all";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemProps } from "@/ui";
import { MenuAddTrigger } from "./2-button-menu-add";

const menuItems: { label: string; action: string; }[] = [
    { label: "Add characters set [A-Z]", /**/ action: "A{1,2}" },
    { label: "Add characters set [a-z]", /**/ action: "a{1,2}" },
    { label: "Add set of numbers",       /**/ action: "d{1,2}" },
    { label: "Add special characters",   /**/ action: "s{1,2}" },
    { label: "Add characters set",       /**/ action: "[X-Z]{1,2}" }, //"[X-Z!-/]{1,2}"
];

function MenuItem({ label, ...rest }: { label: string; } & DropdownMenuItemProps) {
    return (
        <DropdownMenuItem className="text-xs" {...rest}>
            <div className="">
                {label}
            </div>
        </DropdownMenuItem>
    );
}

export function ButtonMenuAdd({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const setCustom = useSetAtom(dlgUiAtoms.customAtom);
    const updateExplanation = useSetAtom(UpdateExplanationAtom);

    function applyRule(idx: number) {
        setCustom((prev) => {
            const value = prev + menuItems[idx].action;
            updateExplanation({ dlgUiAtoms, value });
            return value;
        });
    }

    return (
        <div className="focus-within:ring-1 focus-within:ring-ring rounded-md flex items-center">
            <DropdownMenu>
                <MenuAddTrigger />

                <DropdownMenuContent align="start" className="">
                    {menuItems.map((item, idx) => (
                        <MenuItem label={item.label} onSelect={() => applyRule(idx)} key={idx} />
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
