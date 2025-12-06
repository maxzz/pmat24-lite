import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { FormIconPosition } from "./3-in-form-icon-position";

export function DetectionContent_W32({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    const { captionAtom, monitorAtom, dlg_classAtom, } = oFormProps.oAllAtoms.options.p2Detect; // dlg_tabAtom, dlg_checkexeAtom, processnameAtom, commandlineAtom,
    return (<>
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            <div className={textClasses}>
                <InputWithTitle2Rows stateAtom={captionAtom} label="Windows caption" />
                <InputWithTitle2Rows stateAtom={dlg_classAtom} label="Window class name" />
                {/* <InFormRowInputWTitle stateAtom={dlg_tabAtom} label="Window tab" /> */}
                {/* <InFormRowInputWTitle stateAtom={dlg_checkexeAtom} label="Tab executable" /> */}
                <InputWithTitle2Rows stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />

                {/* <InFormRowInputWTitle stateAtom={processnameAtom} label="Process name" /> */}
                {/* <InFormRowInputWTitle stateAtom={commandlineAtom} label="Command line" /> */}
            </div>
        </AccordionWithTrigger>

        <FormIconPosition oFormProps={oFormProps} />
    </>);
}

const textClasses = "pl-6 pr-0.5 py-1";
