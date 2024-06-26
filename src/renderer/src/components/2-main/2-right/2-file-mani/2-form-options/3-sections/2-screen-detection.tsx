import { useAtomValue } from "jotai";
import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../9-controls";

export function Part2ScreenDetection({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { urlAtom, captionAtom, monitorAtom, dlg_tabAtom, dlg_classAtom, dlg_checkexeAtom, processnameAtom, commandlineAtom } = atoms.p2Detect;
    const isWeb = useAtomValue(atoms.isWebAtom);
    return (
        isWeb
            ? (<>
                <RowInputWLabel stateAtom={urlAtom} label="URL" />
            </>)
            : (<>
                <RowInputWLabel stateAtom={captionAtom} label="Windows Caption" />
                <RowInputWLabel stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />
                
                <RowInputWLabel stateAtom={dlg_classAtom} label="Window class name" />
                <RowInputWLabel stateAtom={dlg_tabAtom} label="Window tab" />
                <RowInputWLabel stateAtom={dlg_checkexeAtom} label="Tab executable" />
                
                <RowInputWLabel stateAtom={processnameAtom} label="Process name" />
                <RowInputWLabel stateAtom={commandlineAtom} label="Command line" />
            </>)
    );
}
