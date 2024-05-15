import { useAtom } from "jotai";
import { PolicyDlgConv } from "./0-conv";
import { Button } from "@/ui";
import { Check } from "../9-constrols";
import { DialogHeader } from "../1-header";
import { SectionRuleTypes } from "../2-complexity";
import { SectionHistory } from "../3-history";
import { SectionGenerationBy } from "../4-generate-by";
import { classNames } from "@/utils";

const sectionClasses = "text-sm font-bold border-primary-700 border-b";

export function PolicyEditorBody({ atoms, setOpen }: { atoms: PolicyDlgConv.PolicyUiAtoms; setOpen: (v: boolean) => void; }) {
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

            <h2 className={sectionClasses}> {/* Predefined or Custom rule */}
                Password complexity
            </h2>
            <SectionRuleTypes atoms={atoms} />

            <div className=""> {/* History */}
                <h2 className={""}>
                    History restrictions
                </h2>
                <SectionHistory atoms={atoms} />
            </div>

            <div className="flex flex-col gap-2"> {/* Generation */}
                <h2 className="">
                    Password generation
                </h2>
                <SectionGenerationBy atoms={atoms} />
            </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-x-2">
            <Button size="sm" onClick={() => setOpen(false)}>OK</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Cancel</Button>
        </div>
    </>);
}
