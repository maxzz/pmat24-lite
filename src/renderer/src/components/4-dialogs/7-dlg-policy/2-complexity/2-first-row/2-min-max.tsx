import { HTMLAttributes } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { PolicyDlgConv, updateMinMaxAtom } from "../../0-all";
import { InputBody } from "@/components/2-main/2-right/2-file-mani/1-form-editor/4-options/4-controls/1-options-row/4-row-body-w-tooltip";
import { OptionInput } from "@/components/2-main/2-right/2-file-mani/1-form-editor/4-options/4-controls/1-options-row/5-option-input";
import { SymbolWarning } from "@/ui/icons";
import { classNames } from "@/utils";

function MinMaxTrigger({ error, className }: HTMLAttributes<SVGSVGElement> & { error: string | undefined; }) {
    return (<>
        {error && (
            <SymbolWarning
                className={classNames("absolute right-0.5 top-2 transform -translate-y-1/2 size-3 text-red-500/90", className)}
            />
        )}
    </>);
}

function MinMaxLengthInputs({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const updateMinMax = useSetAtom(updateMinMaxAtom);
    const onValueChange = () => updateMinMax({ dlgUiAtoms });
    return (
        <div className="text-xs space-y-1">
            <div className="">Password length</div>

            <div className="flex items-center space-x-1">
                <div>
                    min
                </div>

                <InputBody stateAtom={dlgUiAtoms.minLenAtom} Trigger={MinMaxTrigger}>
                    <OptionInput
                        className="px-2 h-8 text-xs max-w-[6ch]"
                        stateAtom={dlgUiAtoms.minLenAtom}
                        onValueChange={onValueChange}
                    />
                </InputBody>

                <div>
                    max
                </div>

                <InputBody stateAtom={dlgUiAtoms.maxLenAtom} Trigger={MinMaxTrigger}>
                    <OptionInput
                        className="px-2 h-8 text-xs max-w-[6ch]"
                        stateAtom={dlgUiAtoms.maxLenAtom}
                        onValueChange={onValueChange}
                    />
                </InputBody>
            </div>
        </div>
    );
}

export function MinMaxInputs({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const isCustom = useAtomValue(dlgUiAtoms.isCustomAtom);
    return (<>
        {/* {!isCustom && ( */}
        <MinMaxLengthInputs dlgUiAtoms={dlgUiAtoms} />
        {/* )} */}
    </>);
}
