import { useState } from "react";
import { atom, useAtom } from "jotai";
import { namesConstrainSet } from "@/store/manifest";
import { PolicyDlgConv } from "../0-all/0-conv";
import { Dropdown } from "../9-constrols";
import { classNames } from "@/utils";
import { Button, Input, Label } from "@/ui";
import { SectionMinMaxLength } from "./2-min-max-length";
import { SectionTestRoom } from "./4-test-room";
import { RulesHelpPopover } from "./21-rules-help-popover";

const selectNames = [...namesConstrainSet, 'Use custom rule'];

export function SectionRuleTypes({ atoms }: { atoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const [selected, setSelected] = useAtom(atoms.constrainSetAtom);
    const isCustom = +selected === selectNames.length - 1;
    const [isCustomRule, setIsCustomRule] = useAtom(atoms.isCustomRuleAtom);

    const isTestAreaOpenAtom = useState(() => atom<string[]>([]))[0];
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);

    return (
        <div className="flex flex-col gap-2 select-none">

            <div className="space-y-1">
                <div className="">Rule for determining password complexity</div>
                <div className="flex items-center justify-between gap-2">
                    <Label className="flex-1 text-xs flex flex-col 1items-center">
                        <Dropdown items={selectNames} value={selected} onValueChange={setSelected} />
                    </Label>

                    {!isCustom && (
                        <SectionMinMaxLength atoms={atoms} />
                    )}
                </div>
            </div>

            <div>
                <div className={classNames("flex items-center gap-2", !isCustom && "invisible pointer-events-none")}>

                    <div className="w-full space-y-1">
                        <div className="">Custom rule</div>

                        <div className={classNames("flex-1 relative h-8 flex items-center justify-between space-x-2")}>
                            <Input className="flex-1 h-8" />
                            <RulesHelpPopover />
                        </div>

                        <Button size="sm" onClick={() => setIsTestAreaOpen(isTestAreaOpen.length ? [] : ['policy'])}>
                            Test area
                        </Button>
                    </div>
                </div>

                {isCustom && (
                    <SectionTestRoom atoms={atoms} isTestAreaOpenAtom={isTestAreaOpenAtom} />
                )}
            </div>

        </div>
    );
}
