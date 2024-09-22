import { useAtom } from "jotai";
import { type PolicyDlgTypes } from "./0-conv";
import { Button } from "@/ui";
import { Check } from "../9-constrols";
import { DialogHeader } from "../1-header";
import { SectionRuleTypes } from "../2-complexity";
import { SectionHistory } from "../3-history";
import { SectionGenerationBy } from "../4-generate-by";
import { classNames } from "@/utils";

type PolicyEditorBodyProps = {
    dlgUiCtx: PolicyDlgTypes.PolicyUiCtx;
    doCloseWithOk: (ok: boolean) => void;
};

const sectionClasses = "text-sm font-bold border-gray-500 border-b";

export function PolicyEditorBody({ dlgUiCtx, doCloseWithOk }: PolicyEditorBodyProps) {
    const [enabled, setEnabled] = useAtom(dlgUiCtx.enabledAtom);
    return (<>
        <DialogHeader
            header="Password Policy Editor"
            subHeader="Specify password complexity, history and generation requirements."
        />

        <Check className="mb-2" checked={enabled} onChange={() => setEnabled((v) => !v)}>
            Enable password policy
        </Check>

        <div className={classNames("flex flex-col space-y-4", !enabled && "opacity-10 pointer-events-none")}>

            {/* Predefined or Custom rule */}
            <div>
                <h2 className={sectionClasses}>
                    Password complexity
                </h2>
                <SectionRuleTypes dlgUiCtx={dlgUiCtx} />
            </div>

            {/* History */}
            <div>
                <h2 className={sectionClasses}>
                    Password history restrictions
                </h2>
                <SectionHistory dlgUiCtx={dlgUiCtx} />
            </div>

            {/* Generation */}
            <div>
                <h2 className={sectionClasses}>
                    Password generation
                </h2>
                <SectionGenerationBy dlgUiCtx={dlgUiCtx} />
            </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-x-2">
            <Button size="sm" className="min-w-16" onClick={() => doCloseWithOk(true)}>OK</Button>
            <Button size="sm" className="min-w-16" onClick={() => doCloseWithOk(false)}>Cancel</Button>
        </div>
    </>);
}
