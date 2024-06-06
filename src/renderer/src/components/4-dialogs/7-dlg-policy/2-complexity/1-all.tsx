import { useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { PolicyDlgConv } from "../0-all/0-conv";
import { Dropdown } from "../9-constrols";
import { classNames, turnOffAutoComplete } from "@/utils";
import { Button, Input, Label } from "@/ui";
import { SectionMinMaxLength } from "./2-min-max-length";
import { SectionTestRoom } from "./4-test-room";
import { RulesHelpPopover } from "./21-rules-help-popover";

function RuleSelectSection({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const [isCustom, setIsCustom] = useAtom(dlgUiAtoms.isCustomAtom);
    const [selected, setSelected] = useAtom(dlgUiAtoms.constrainSetAtom);
    const setSelected2 = useSetAtom(dlgUiAtoms.constrainSet0Atom);

    function onValueChange(value: string) {
        const isCustom = +value === PolicyDlgConv.chSetRuleNames.length - 1;
        if (!isCustom) {
            setSelected2(value);
        }
        setIsCustom(isCustom);
        setSelected(value);
    }

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-1">
                <div>
                    Password complexity rule
                </div>
                <Label className="flex-1 text-xs flex flex-col 1items-center">
                    <Dropdown items={PolicyDlgConv.chSetRuleNames} value={selected} onValueChange={onValueChange} />
                </Label>
            </div>

            {!isCustom && (
                <SectionMinMaxLength dlgUiAtoms={dlgUiAtoms} />
            )}
        </div>
    );
}

function CustomRuleSection({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const isCustom = useAtomValue(dlgUiAtoms.isCustomAtom);
    const [custom, setCustom] = useAtom(dlgUiAtoms.customAtom);

    const isTestAreaOpenAtom = useState(() => atom<string[]>([]))[0];
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);
    return (
        <div>
            <div className={classNames("flex items-center gap-2", !isCustom && "invisible pointer-events-none")}>
                <div className="w-full space-y-1">
                    <div className="">Custom rule</div>

                    <div className={classNames("flex-1 relative h-8 flex items-center justify-between space-x-2")}>
                        <Input
                            className="flex-1 h-8 font-mono text-xs text-mani-foreground bg-mani-background border-mani-border-muted"
                            value={custom}
                            onChange={(e) => setCustom(e.target.value)}
                            {...turnOffAutoComplete}
                        />

                        <RulesHelpPopover />
                    </div>

                    <Button size="sm" onClick={() => setIsTestAreaOpen(isTestAreaOpen.length ? [] : ['policy'])}>
                        Test area
                    </Button>
                </div>
            </div>

            {isCustom && (
                <SectionTestRoom atoms={dlgUiAtoms} isTestAreaOpenAtom={isTestAreaOpenAtom} />
            )}
        </div>
    );
}

export function SectionRuleTypes({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    return (
        <div className="mt-2 flex flex-col gap-2 select-none">
            <RuleSelectSection dlgUiAtoms={dlgUiAtoms} />
            <CustomRuleSection dlgUiAtoms={dlgUiAtoms} />
        </div>
    );
}
