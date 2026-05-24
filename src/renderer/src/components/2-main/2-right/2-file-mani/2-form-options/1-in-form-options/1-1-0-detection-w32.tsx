import { InputWithTitle2Cols, InputWithTitle2Rows } from "@/ui/local-ui";
import { type OFormProps } from "@/store/1-file-mani-atoms";
import { optionsTooltips } from "../8-tooltips";

export function DetectionContent_W32({ oFormProps }: { oFormProps: OFormProps; }) {
    const { captionAtom, monitorAtom, dlg_classAtom } = oFormProps.oAllAtoms.options.p2Detect; // dlg_tabAtom, dlg_checkexeAtom, processnameAtom, commandlineAtom,
    return (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-1.5 gap-y-2.5">
            <InputWithTitle2Rows stateAtom={captionAtom} label="Window caption" titleTooltip={optionsTooltips.windowCaption} />
            <InputWithTitle2Rows stateAtom={dlg_classAtom} label="Window class name" />
            {/* <InFormRowInputWTitle stateAtom={dlg_tabAtom} label="Window tab" /> */}
            {/* <InFormRowInputWTitle stateAtom={dlg_checkexeAtom} label="Tab executable" /> */}
            <InputWithTitle2Cols stateAtom={monitorAtom} label="Monitor screen changes" asSwitch titleTooltip={optionsTooltips.monitor} labelClasses="font-normal justify-end justify-self-end!" containerClasses="py-0!" />

            {/* <InFormRowInputWTitle stateAtom={processnameAtom} label="Process name" /> */}
            {/* <InFormRowInputWTitle stateAtom={commandlineAtom} label="Command line" /> */}
        </div>
    );
}
