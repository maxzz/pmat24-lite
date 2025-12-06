import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { Check } from "../../9-constrols";
import { type PolicyDlgTypes } from "../0-conv";
import { DialogTitleHeader } from "../../../5-confirm/8-dialog-title-header";
import { SectionRuleTypes } from "../../2-complexity";
import { SectionHistory } from "../../3-password-history";
import { SectionGenerationBy } from "../../4-generate-by";

type PolicyEditorBodyProps = {
    dlgUiCtx: PolicyDlgTypes.PolicyUiCtx;
    closeDlg: (ok: boolean) => void;
};

export function PolicyEditorBody({ dlgUiCtx, closeDlg }: PolicyEditorBodyProps) {
    const [enabled, setEnabled] = useAtom(dlgUiCtx.enabledAtom);
    return (
        <DialogTitleHeader title="Password Policy Editor" className={contentClasses} onDlgClose={closeDlg} modal>
            <div className="px-4 pb-2 grid gap-4">

                <div className="text-xs font-light text-foreground">
                    Specify password complexity, history and generation requirements.
                </div>

                <Check checked={enabled} onChange={() => setEnabled((v) => !v)}>
                    Enable password policy
                </Check>

                <div className={classNames("flex flex-col gap-y-4", !enabled && "opacity-10 pointer-events-none")}>

                    <div>
                        <h2 className={sectionClasses}> {/* Predefined or Custom rule */}
                            Password complexity
                        </h2>
                        <SectionRuleTypes dlgUiCtx={dlgUiCtx} />
                    </div>

                    <div>
                        <h2 className={sectionClasses}> {/* History */}
                            Password history restrictions
                        </h2>
                        <SectionHistory dlgUiCtx={dlgUiCtx} />
                    </div>

                    <div>
                        <h2 className={sectionClasses}> {/* Generation */}
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
        </DialogTitleHeader>
    );
}

const contentClasses = "p-0 pb-2 w-fit min-w-[440px] max-w-[500px] text-xs gap-1 select-none";
const sectionClasses = "text-xs font-semibold border-gray-500/50 border-b";
