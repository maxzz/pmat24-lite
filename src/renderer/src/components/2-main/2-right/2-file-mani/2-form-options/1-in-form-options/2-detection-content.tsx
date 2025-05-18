import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { FormOptionsAndFileUsCtxAtoms, type OFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InFormRowInputWTitle } from "./3-in-form-controls";
// import { Block4_ScreenDetection } from "../0-all/2-4-screen-detection";

export function WebDetectionContenty({ ctx }: { ctx: OFormContextProps; }) {
    const formIdx = ctx.oAllAtoms.options.formIdx;
    return (
        <div className={textClasses}>
            <Block4_ScreenDetection ctx={ctx} />
        </div>
    );
}

export function W32DetectionContent({ ctx }: { ctx: OFormContextProps; }) {
    return (
        <div>
            win32
            <Block4_ScreenDetection ctx={ctx} />
        </div>
    );
}

const textClasses = 'pl-6 pr-2 font-normal';

function Block4_ScreenDetection({ ctx }: { ctx: OFormContextProps; }) {

    const atoms = ctx.oAllAtoms.options;
    const isWeb = useAtomValue(atoms.isWebAtom);

    const {
        ourlAtom, murlAtom,
        captionAtom,
        monitorAtom,
        dlg_tabAtom, dlg_classAtom, dlg_checkexeAtom,
        processnameAtom, commandlineAtom,
    } = atoms.p2Detect;

    return (
        isWeb
            ? (<>
                <InFormRowInputWTitle stateAtom={ourlAtom} label="Original URL" />
                <InFormRowInputWTitle stateAtom={murlAtom} label="Match URL" />
            </>)
            : (<>
                <InFormRowInputWTitle stateAtom={captionAtom} label="Windows caption" />
                <InFormRowInputWTitle stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />

                <InFormRowInputWTitle stateAtom={dlg_classAtom} label="Window class name" />
                <InFormRowInputWTitle stateAtom={dlg_tabAtom} label="Window tab" />
                <InFormRowInputWTitle stateAtom={dlg_checkexeAtom} label="Tab executable" />

                <InFormRowInputWTitle stateAtom={processnameAtom} label="Process name" />
                <InFormRowInputWTitle stateAtom={commandlineAtom} label="Command line" />
            </>)
    );
}
