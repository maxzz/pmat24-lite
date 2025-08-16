import { useAtomValue } from "jotai";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { type OFormProps } from "@/store/2-file-mani-atoms";

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

        <FormW32IconPosition oFormProps={oFormProps} />
    </>);
}

function FormW32IconPosition({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);

    if (isWeb) {
        return null;
    }

    return (
        <AccordionWithTrigger name='form-icon' formIdx={formIdx} triggerText="Password Manager Icon">
            <PMIcon_W32 oFormProps={oFormProps} />
        </AccordionWithTrigger>
    );
}

function PMIcon_W32({ oFormProps }: { oFormProps: OFormProps; }) {
    const { idAtom, locAtom } = oFormProps.oAllAtoms.options.p5Icon;
    return (
        <div className={textClasses}>
            <InputWithTitle2Rows stateAtom={idAtom} label="Location ID" />
            <InputWithTitle2Rows stateAtom={locAtom} label="Location" />
        </div>
    );
}

const textClasses = "pl-6 pr-0.5";
