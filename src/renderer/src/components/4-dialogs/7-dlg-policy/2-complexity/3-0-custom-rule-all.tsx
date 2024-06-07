import { useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { PolicyDlgConv } from "../0-all/0-conv";
import { classNames, turnOffAutoComplete } from "@/utils";
import { Button, Input } from "@/ui";
import { SectionTestRoom } from "./3-1-test-room-accordion";
import { RulesHelpPopover } from "./3-3-rules-help-popover";

export function CustomRuleSection({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {

    const isCustom = useAtomValue(dlgUiAtoms.isCustomAtom);
    const [custom, setCustom] = useAtom(dlgUiAtoms.customAtom);

    const isTestAreaOpenAtom = useState(() => atom<string[]>([]))[0];
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);
    return (
        <div>
            <div className={classNames("flex items-center gap-2", !isCustom && "invisible pointer-events-none")}>
                <div className="w-full space-y-1">
                    <div className="">
                        Custom rule
                    </div>

                    <div className="flex items-center gap-x-2">
                        <div className={classNames("flex-1 relative h-8 flex items-center justify-between space-x-2")}>
                            <Input
                                className="flex-1 h-8 font-mono text-xs text-mani-foreground bg-mani-background border-mani-border-muted"
                                value={custom}
                                onChange={(e) => setCustom(e.target.value)}
                                {...turnOffAutoComplete} />

                            <div className="absolute right-1 flex items-center gap-1">
                                <RulesHelpPopover />

                                <Button
                                    className="h-6"
                                    size="sm"
                                    onClick={() => setIsTestAreaOpen(isTestAreaOpen.length ? [] : ['policy'])}
                                >
                                    Test area
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {isCustom && (
                <SectionTestRoom atoms={dlgUiAtoms} isTestAreaOpenAtom={isTestAreaOpenAtom} />
            )}
        </div>
    );
}
