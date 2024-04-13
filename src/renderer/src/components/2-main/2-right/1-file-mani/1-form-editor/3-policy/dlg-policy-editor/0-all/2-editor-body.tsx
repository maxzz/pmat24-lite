import { useAtom } from "jotai";
import { PolicyUiAtoms } from "./0-create-ui-atoms";
import { DialogHeader, SectionRuleTypes, SectionHistory, SectionGenerationBy } from "../1-header";
import { Check } from "../9-constrols";
import { classNames } from "@/utils";
import { Button } from "@/ui";

const sectionClasses = "text-sm font-bold border-primary-700 border-b";

export function PolicyEditorBody({ atoms, setOpen }: { atoms: PolicyUiAtoms; setOpen: (v: boolean) => void; }) {
    const [enabled, setEnabled] = useAtom(atoms.enabledAtom);
    return (<>
        <DialogHeader
            header="Policy Editor"
            subHeader="Specify password complexity, history and generation requirements."
        />

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
            {/* <SectionMinMaxLength atoms={atoms} /> */}

            {/* Test section */}
            {/* <SectionTestRoom atoms={atoms} /> */}

            {/* History */}
            <h2 className={sectionClasses}>
                History restrictions
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
            <Button size="sm" onClick={() => setOpen(false)}>OK</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Cancel</Button>
        </div>
    </>);
}
