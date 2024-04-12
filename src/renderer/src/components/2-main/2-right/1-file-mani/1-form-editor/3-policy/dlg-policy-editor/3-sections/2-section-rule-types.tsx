import { useAtom } from "jotai";
import { Atomize } from "@/util-hooks";
import { namesConstrainSet } from "@/store/manifest";
import { PolicyUiForAtoms } from "../0-all/0-create-ui-atoms";
import { Radio, Dropdown } from "../4-constrols";
import { classNames } from "@/utils";
import { Button, Input, Label } from "@/ui";
import { SectionMinMaxLength } from "./3-section-min-max-length";

const selectNames = [...namesConstrainSet, 'Custom rule'];

export function SectionRuleTypes({ atoms }: { atoms: Atomize<PolicyUiForAtoms>; }) {
    const [isCustomRule, setIsCustomRule] = useAtom(atoms.isCustomRuleAtom);
    const [seleced, setSeleced] = useAtom(atoms.constrainSetAtom);
    const isCustom = +seleced === selectNames.length - 1;
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
                <Label className="text-xs flex items-center gap-2">
                    Rule
                    <Dropdown items={selectNames} value={seleced} onValueChange={setSeleced} />
                </Label>

                <SectionMinMaxLength atoms={atoms} />
            </div>

            <div className={classNames("flex items-center space-x-2", !isCustom && "invisible pointer-events-none")}>
                <Input className="flex-1" />

                <Button className="h-full aspect-square rounded-full" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    ?
                </Button>
            </div>


        </div>
    );
}

/* export function SectionRuleTypes2({ atoms }: { atoms: Atomize<PolicyUiForAtoms>; }) {
    const [isCustomRule, setIsCustomRule] = useAtom(atoms.isCustomRuleAtom);
    return (
        <div className="space-y-8">
            <div>
                <Radio name="rule-type" checked={isCustomRule === '0'} onChange={() => setIsCustomRule('0')}>
                    Predefined rule
                </Radio>

                <div className={classNames("mt-2", isCustomRule !== '0' && "opacity-10 pointer-events-none")}>
                    <Dropdown items={namesConstrainSet} valueAtom={atoms.constrainSetAtom} />
                </div>
            </div>

            <div>
                <Radio name="rule-type" checked={isCustomRule === '1'} onChange={() => setIsCustomRule('1')}>
                    Custom rule
                </Radio>

                <div className={classNames("mt-2 flex items-center space-x-2", isCustomRule !== '1' && "opacity-10 pointer-events-none")}>
                    <Input className="flex-1" />
                    <button className="self-stretch px-4 p-1 bg-primary-700 rounded">
                        ?
                    </button>
                </div>
            </div>
        </div>
    );
}
 */