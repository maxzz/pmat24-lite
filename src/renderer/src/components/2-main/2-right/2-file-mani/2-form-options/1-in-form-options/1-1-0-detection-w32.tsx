import { InputWithTitle2Rows } from "@/ui/local-ui";
import { type OFormProps } from "@/store/2-file-mani-atoms";

export function DetectionContent_W32({ oFormProps }: { oFormProps: OFormProps; }) {
    const { captionAtom, monitorAtom, dlg_classAtom } = oFormProps.oAllAtoms.options.p2Detect; // dlg_tabAtom, dlg_checkexeAtom, processnameAtom, commandlineAtom,
    return (<>
        <InputWithTitle2Rows stateAtom={captionAtom} label="Window caption" />
        <InputWithTitle2Rows stateAtom={dlg_classAtom} label="Window class name" />
        {/* <InFormRowInputWTitle stateAtom={dlg_tabAtom} label="Window tab" /> */}
        {/* <InFormRowInputWTitle stateAtom={dlg_checkexeAtom} label="Tab executable" /> */}
        <InputWithTitle2Rows stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />

        {/* <InFormRowInputWTitle stateAtom={processnameAtom} label="Process name" /> */}
        {/* <InFormRowInputWTitle stateAtom={commandlineAtom} label="Command line" /> */}
    </>);
}
