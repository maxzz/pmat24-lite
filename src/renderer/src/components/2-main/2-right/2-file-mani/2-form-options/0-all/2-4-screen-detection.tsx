import { useAtomValue } from "jotai";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { RowInputWTitle2Cols } from "../9-controls";

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
            ? (<>
                <RowInputWTitle2Cols stateAtom={ourlAtom} label="Original URL" />
                <RowInputWTitle2Cols stateAtom={murlAtom} label="Match URL" />
            </>)
            : (<>
                <RowInputWTitle2Cols stateAtom={captionAtom} label="Windows caption" />
                <RowInputWTitle2Cols stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />

                <RowInputWTitle2Cols stateAtom={dlg_classAtom} label="Window class name" />
                <RowInputWTitle2Cols stateAtom={dlg_tabAtom} label="Window tab" />
                <RowInputWTitle2Cols stateAtom={dlg_checkexeAtom} label="Tab executable" />

                <RowInputWTitle2Cols stateAtom={processnameAtom} label="Process name" />
                <RowInputWTitle2Cols stateAtom={commandlineAtom} label="Command line" />
            </>)
    );
}
