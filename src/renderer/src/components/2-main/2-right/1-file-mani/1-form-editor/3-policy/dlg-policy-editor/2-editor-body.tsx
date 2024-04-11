import { useAtom } from "jotai";
import { Atomize } from "@/hooks";
import { PolicyUi } from "./0-create-ui-atoms";
import { DialogHeader, SectionRuleTypes, SectionMinMaxLength, SectionTestRoom, SectionHistory, SectionGenerationBy, BottomButton } from "./3-sections";
import { Check } from "./4-constrols";
import { classNames } from "@/utils";

const frameClasses = "p-4 \
text-sm \
\
text-primary-400 bg-primary-800 \
\
border-primary-600/20 shadow-primary-700/30 \
\
border rounded shadow \
flex flex-col space-y-4";

const sectionClasses = "text-sm font-bold border-primary-700 border-b";

export function PolicyEditorBody({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [enabled, setEnabled] = useAtom(atoms.enabledAtom);
    return (
        <div className={frameClasses}>
            {/* Header */}
            <DialogHeader header="Policy Editor" subHeader="Specify password complexity, history and generation requirements." />

            <Check checked={enabled} onChange={() => setEnabled(v => !v)}>
                Enable password policy
            </Check>

            <div className={classNames("flex flex-col space-y-4", !enabled && "opacity-10 pointer-events-none")}>
                {/* Predefined or Custom rule */}
                <h2 className={sectionClasses}>
                    Password complexity
                </h2>
                <SectionRuleTypes atoms={atoms} />

                {/* Min / Max length */}
                <SectionMinMaxLength atoms={atoms} />

                {/* Test section */}
                <h2 className={sectionClasses}>
                    Test password complexity
                </h2>
                <SectionTestRoom atoms={atoms} />

                {/* History */}
                <h2 className={sectionClasses}>
                    Password history restrictions
                </h2>
                <SectionHistory atoms={atoms} />

                {/* Generation */}
                <h2 className={sectionClasses}>
                    Password generation
                </h2>
                <SectionGenerationBy atoms={atoms} />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-x-2">
                <BottomButton>OK</BottomButton>
                <BottomButton>Cancel</BottomButton>
            </div>
        </div>
    );
}
