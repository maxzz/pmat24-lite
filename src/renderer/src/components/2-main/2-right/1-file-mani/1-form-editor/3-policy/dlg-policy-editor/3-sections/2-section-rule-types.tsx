import { useAtom } from "jotai";
import { Atomize } from "@/util-hooks";
import { namesConstrainSet } from "@/store/manifest";
import { PolicyUi } from "../0-all/0-create-ui-atoms";
import { Radio, Input, Dropdown } from "../4-constrols";
import { classNames } from "@/utils";

export function SectionRuleTypes({ atoms }: { atoms: Atomize<PolicyUi>; }) {
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
