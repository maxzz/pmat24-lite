import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { InFormRowInputWTitle } from "./3-in-form-controls";

export function DetectionContent_Web({ ctx }: { ctx: OFormContextProps; }) {
    const {
        ourlAtom, murlAtom,
    } = ctx.oAllAtoms.options.p2Detect;
    return (
        <div className={textClasses}>
            <InFormRowInputWTitle stateAtom={ourlAtom} label="Original URL" />
            <InFormRowInputWTitle stateAtom={murlAtom} label="Match URL" />
        </div>
    );
}

export function DetectionContent_W32({ ctx }: { ctx: OFormContextProps; }) {
    const {
        captionAtom,
        monitorAtom,
        dlg_tabAtom, dlg_classAtom, dlg_checkexeAtom,
        processnameAtom, commandlineAtom,
    } = ctx.oAllAtoms.options.p2Detect;
    return (
        <div className={textClasses}>
            <InFormRowInputWTitle stateAtom={captionAtom} label="Windows caption" />
            <InFormRowInputWTitle stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />

            <InFormRowInputWTitle stateAtom={dlg_classAtom} label="Window class name" />
            <InFormRowInputWTitle stateAtom={dlg_tabAtom} label="Window tab" />
            <InFormRowInputWTitle stateAtom={dlg_checkexeAtom} label="Tab executable" />

            <InFormRowInputWTitle stateAtom={processnameAtom} label="Process name" />
            <InFormRowInputWTitle stateAtom={commandlineAtom} label="Command line" />
        </div>
    );
}

const textClasses = '1pl-6 1pr-2 1font-normal';
