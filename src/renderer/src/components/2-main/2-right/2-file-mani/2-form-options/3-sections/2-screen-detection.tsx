import { useAtomValue } from "jotai";
import { type OptionsState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";

export function Part2ScreenDetection({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { ourlAtom, murlAtom, captionAtom, monitorAtom, dlg_tabAtom, dlg_classAtom, dlg_checkexeAtom, processnameAtom, commandlineAtom } = atoms.p2Detect;
    const isWeb = useAtomValue(atoms.isWebAtom);
    return (
        isWeb
            ? (<>
                <RowInputWTitle stateAtom={ourlAtom} label="Original URL" />
                <RowInputWTitle stateAtom={murlAtom} label="Match URL" />
            </>)
            : (<>
                <RowInputWTitle stateAtom={captionAtom} label="Windows Caption" />
                <RowInputWTitle stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />
                
                <RowInputWTitle stateAtom={dlg_classAtom} label="Window class name" />
                <RowInputWTitle stateAtom={dlg_tabAtom} label="Window tab" />
                <RowInputWTitle stateAtom={dlg_checkexeAtom} label="Tab executable" />
                
                <RowInputWTitle stateAtom={processnameAtom} label="Process name" />
                <RowInputWTitle stateAtom={commandlineAtom} label="Command line" />
            </>)
    );
}
