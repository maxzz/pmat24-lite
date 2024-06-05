import { PolicyDlgConv } from "../0-all/0-conv";
import { OptionInput } from "@/components/2-main/2-right/2-file-mani/1-form-editor/4-options/4-controls/1-options-row/5-option-input";
import { InputBody } from "@/components/2-main/2-right/2-file-mani/1-form-editor/4-options/4-controls/1-options-row/4-row-body-w-tooltip";
import { MinMaxTrigger } from "./2-validation-trigger";

export function SectionMinMaxLength({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    return (
        <div className="text-xs space-y-1">
            <div className="">Password length</div>

            <div className="flex items-center space-x-1">
                <div>
                    min
                </div>

                <InputBody stateAtom={dlgUiAtoms.minLenAtom} Trigger={MinMaxTrigger}>
                    <OptionInput
                        stateAtom={dlgUiAtoms.minLenAtom}
                        className="px-2 h-8 text-xs max-w-[6ch]"
                    />
                </InputBody>

                <div>
                    max
                </div>

                <InputBody stateAtom={dlgUiAtoms.maxLenAtom} Trigger={MinMaxTrigger}>
                    <OptionInput
                        stateAtom={dlgUiAtoms.maxLenAtom}
                        className="px-2 h-8 text-xs max-w-[6ch]"
                    />
                </InputBody>
            </div>
        </div>
    );
}
