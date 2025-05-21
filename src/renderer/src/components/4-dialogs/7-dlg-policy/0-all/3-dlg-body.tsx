import { useAtom } from "jotai";
import { type PolicyDlgTypes } from "./0-conv";
import { Button, DialogDescription } from "@/ui";
import { Check } from "../9-constrols";
import { DialogHeader } from "../1-header";
import { SectionRuleTypes } from "../2-complexity";
import { SectionHistory } from "../3-history";
import { SectionGenerationBy } from "../4-generate-by";
import { classNames } from "@/utils";

type PolicyEditorBodyProps = {
    dlgUiCtx: PolicyDlgTypes.PolicyUiCtx;
    closeDlg: (ok: boolean) => void;
};

export function PolicyEditorBody({ dlgUiCtx, closeDlg }: PolicyEditorBodyProps) {
    const [enabled, setEnabled] = useAtom(dlgUiCtx.enabledAtom);
    return (
        <div className="px-4 pb-2 grid gap-4">
            {/* <DialogHeader
            header="Password Policy Editor"
            subHeader="Specify password complexity, history and generation requirements."
        /> */}

            <div className="text-xs text-foreground">
                Specify password complexity, history and generation requirements.
            </div>

            <Check className="1mb-2" checked={enabled} onChange={() => setEnabled((v) => !v)}>
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
                <Button size="xs" className="min-w-16" onClick={() => closeDlg(true)}>OK</Button>
                <Button size="xs" className="min-w-16" onClick={() => closeDlg(false)}>Cancel</Button>
            </div>
        </div>
    );
}

const sectionClasses = "text-xs font-semibold border-gray-500/50 border-b";
