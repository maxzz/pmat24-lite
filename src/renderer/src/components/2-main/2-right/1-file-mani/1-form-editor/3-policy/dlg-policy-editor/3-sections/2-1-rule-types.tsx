import { useAtom } from "jotai";
import { namesConstrainSet } from "@/store/manifest";
import { PolicyUiAtoms } from "../0-all/0-create-ui-atoms";
import { Dropdown } from "../4-constrols";
import { classNames } from "@/utils";
import { Button, Input, Label } from "@/ui";
import { SectionMinMaxLength } from "./3-2-min-max-length";
import { SectionTestRoom } from "./4-test-room";

const selectNames = [...namesConstrainSet, 'Custom rule'];

export function SectionRuleTypes({ atoms }: { atoms: PolicyUiAtoms; }) {
    const [isCustomRule, setIsCustomRule] = useAtom(atoms.isCustomRuleAtom);
    const [selected, setSelected] = useAtom(atoms.constrainSetAtom);
    const isCustom = +selected === selectNames.length - 1;
    return (
        <div className="flex flex-col gap-2 select-none">
            <div className="flex items-center justify-between gap-2">
                <Label className="flex-1 text-xs flex items-center gap-2">
                    Rule
                    <Dropdown items={selectNames} value={selected} onValueChange={setSelected} />
                </Label>

                <SectionMinMaxLength atoms={atoms} />
            </div>

            <div className="space-y-2">
                <div className={classNames("flex items-center justify-between space-x-2", !isCustom && "invisible pointer-events-none")}>
                    <Input className="flex-1" />

                    <Button className="h-full aspect-square rounded-full" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                        ?
                    </Button>
                </div>

                <SectionTestRoom atoms={atoms} />
            </div>
        </div>
    );
}
