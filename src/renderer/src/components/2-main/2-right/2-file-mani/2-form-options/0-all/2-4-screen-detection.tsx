import { useAtomValue } from "jotai";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";
import { Fragment } from "react";

export function Block4_ScreenDetection({ ctx }: { ctx: OFormContextProps; }) {

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
            ? (<div key="web" className="contents">
                <RowInputWTitle stateAtom={ourlAtom} label="Original URL" />
                <RowInputWTitle stateAtom={murlAtom} label="Match URL" />
            </div>)
            : (<div key="not-web" className="contents">
                <RowInputWTitle stateAtom={captionAtom} label="Windows Caption" />
                <RowInputWTitle stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />

                <RowInputWTitle stateAtom={dlg_classAtom} label="Window class name" />
                <RowInputWTitle stateAtom={dlg_tabAtom} label="Window tab" />
                <RowInputWTitle stateAtom={dlg_checkexeAtom} label="Tab executable" />

                <RowInputWTitle stateAtom={processnameAtom} label="Process name" />
                <RowInputWTitle stateAtom={commandlineAtom} label="Command line" />
            </div>)
    );
}
