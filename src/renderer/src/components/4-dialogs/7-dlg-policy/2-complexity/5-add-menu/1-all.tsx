import { useSetAtom } from "jotai";
import { type PolicyDlgTypes, updateExplanationAtom } from "../../0-all";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemProps } from "@/ui";
import { MenuAddTrigger } from "./2-button-menu-add";

type MenuActionItem = {
    label: string;
    action: string;
}

const menuItems: MenuActionItem[] = [
    { label: "Add characters set [A-Z]", /**/ action: "A{1,2}" },
    { label: "Add characters set [a-z]", /**/ action: "a{1,2}" },
    { label: "Add set of numbers",       /**/ action: "d{1,2}" },
    { label: "Add special characters",   /**/ action: "s{1,2}" },
    { label: "Add characters set",       /**/ action: "[X-Z]{1,2}" }, //"[X-Z!-/]{1,2}"
    { label: "Add group",                /**/ action: "" }, // add group as "(...)" //TODO: do we need to prevent adding group if it's already there?
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

export function ButtonMenuAdd({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {

    const setCustom = useSetAtom(dlgUiCtx.customAtom);
    const updateExplanation = useSetAtom(updateExplanationAtom);

    function applyRule(idx: number) {
        setCustom((prev) => {
            const item = menuItems[idx];
            const custom = item.action ? `${prev}${item.action}` : `(${prev})`;
            updateExplanation({ dlgUiCtx: dlgUiCtx, custom });
            return custom;
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
