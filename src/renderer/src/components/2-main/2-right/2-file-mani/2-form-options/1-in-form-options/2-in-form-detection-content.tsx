import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { InFormRowInputWTitle } from "@/ui/local-ui";


export function DetectionContent_Web({ ctx }: { ctx: OFormContextProps; }) {
    const { ourlAtom, murlAtom, } = ctx.oAllAtoms.options.p2Detect;
    return (
        <div className={textClasses}>
            <InFormRowInputWTitle stateAtom={ourlAtom} label="Original URL (readonly)" asTextarea readOnly />
            <InFormRowInputWTitle stateAtom={murlAtom} label="Match URL" asTextarea />
        </div>
    );
}

export function DetectionContent_W32({ ctx }: { ctx: OFormContextProps; }) {
    const { captionAtom, monitorAtom, dlg_classAtom, } = ctx.oAllAtoms.options.p2Detect; // dlg_tabAtom, dlg_checkexeAtom, processnameAtom, commandlineAtom,
    return (
        <div className={textClasses}>
            <InFormRowInputWTitle stateAtom={captionAtom} label="Windows caption" />
            <InFormRowInputWTitle stateAtom={dlg_classAtom} label="Window class name" />
            {/* <InFormRowInputWTitle stateAtom={dlg_tabAtom} label="Window tab" /> */}
            {/* <InFormRowInputWTitle stateAtom={dlg_checkexeAtom} label="Tab executable" /> */}
            <InFormRowInputWTitle stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />

            {/* <InFormRowInputWTitle stateAtom={processnameAtom} label="Process name" /> */}
            {/* <InFormRowInputWTitle stateAtom={commandlineAtom} label="Command line" /> */}
        </div>
    );
}

export function PMIcon_W32({ ctx }: { ctx: OFormContextProps; }) {
    const { idAtom, locAtom } = ctx.oAllAtoms.options.p5Icon;
    return (
        <div className={textClasses}>
            <InFormRowInputWTitle stateAtom={idAtom} label="Location ID" />
            <InFormRowInputWTitle stateAtom={locAtom} label="Location" />
        </div>
    );
}

const textClasses = 'pl-6';
