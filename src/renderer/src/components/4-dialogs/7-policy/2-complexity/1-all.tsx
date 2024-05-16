import { atom, useAtom } from "jotai";
import { namesConstrainSet } from "@/store/manifest";
import { PolicyDlgConv } from "../0-all/0-conv";
import { Dropdown } from "../9-constrols";
import { classNames } from "@/utils";
import { Button, Input, Label } from "@/ui";
import { SectionMinMaxLength } from "./2-min-max-length";
import { SectionTestRoom } from "./4-test-room";
import { useState } from "react";

const selectNames = [...namesConstrainSet, 'Custom rule'];

export function SectionRuleTypes({ atoms }: { atoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const [isCustomRule, setIsCustomRule] = useAtom(atoms.isCustomRuleAtom);
    const [selected, setSelected] = useAtom(atoms.constrainSetAtom);
    const isCustom = +selected === selectNames.length - 1;

    const isTestAreaOpenAtom = useState(() => atom<string[]>([]))[0];
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);

    return (
        <div className="flex flex-col gap-2 select-none">

            <div className="flex items-center justify-between gap-2">
                <Label className="flex-1 text-xs flex items-center gap-2">
                    Rule
                    <Dropdown items={selectNames} value={selected} onValueChange={setSelected} />
                </Label>

                <SectionMinMaxLength atoms={atoms} />
            </div>

            <div className={classNames("flex items-center gap-2", !isCustom && "invisible pointer-events-none")}>
                <div className={classNames("flex-1 relative h-8 flex items-center justify-between space-x-2")}>
                    <Input className="flex-1" />

                    <Button className="absolute right-2 aspect-square rounded-full" variant="outline" size="xs" tabIndex={-1} title="Explanation" >
                        ?
                    </Button>
                </div>

                <Button onClick={() => setIsTestAreaOpen(isTestAreaOpen.length ? [] : ['policy'])}>
                    Test area
                </Button>


            </div>

            <SectionTestRoom atoms={atoms} isTestAreaOpenAtom={isTestAreaOpenAtom} />

        </div>
    );
}
