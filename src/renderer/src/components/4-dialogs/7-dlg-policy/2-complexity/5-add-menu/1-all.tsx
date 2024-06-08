import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/ui";
import { MenuAddTrigger } from "./2-button-menu-add";
import { PolicyDlgConv } from "../../0-all/0-conv";
import { ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";

function MenuItem({ label, ...rest }: { label: string; } & ComponentPropsWithoutRef<typeof DropdownMenuItem>) {
    return (
        <DropdownMenuItem className="text-xs" {...rest}>
            <div className="">
                {label}
            </div>
        </DropdownMenuItem>
    );
}

const menuItems: { label: string; action: string; }[] = [
    { label: "Add [A-Z]",                /**/ action: "A{1,2}" },
    { label: "Add [a-z]",                /**/ action: "a{1,2}" },
    { label: "Add numbers",              /**/ action: "d{1,2}" },
    { label: "Add special characters",   /**/ action: "s{1,2}" },
    { label: "Add characters set",       /**/ action: "[X-Z]{1,2}" }, //"[X-Z!-/]{1,2}"
];

// function onChange({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; value: string; }) {
//     try {
//         dlgUiAtoms.parser.sourceText = value;
//         dlgUiAtoms.parser.doParse();
        
//         const final = [];
//         getCustomRuleExplanation(dlgUiAtoms.parser.rulesAndMeta.rules, final)
//         const explanation = final.join('\n');
//         setExplanation(explanation);
//     } catch (e) {
//         console.error(e);
//     }

//     setCustom(value);
// }

export function ButtonMenuAdd({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const setCustom = useSetAtom(dlgUiAtoms.customAtom);

    function applyRule(idx: number) {
        setCustom((prev) => {
            const newCustom = prev + menuItems[idx].action;

            try {
                dlgUiAtoms.parser.sourceText = newCustom;
                dlgUiAtoms.parser.doParse();
            } catch (error) {
                console.error(error);                
            }

            return newCustom;
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
