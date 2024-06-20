import { useAtomValue } from "jotai";
import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../4-controls";

export function Part2ScreenDetection({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { urlAtom, captionAtom, monitorAtom } = atoms.uiPart2ScreenDetection;
    const isWeb = useAtomValue(atoms.isWebAtom);
    return (
        isWeb
            ? (<>
                <RowInputWLabel stateAtom={urlAtom} label="URL" />
            </>)
            : (<>
                <RowInputWLabel stateAtom={captionAtom} label="Windows Caption" />
                <RowInputWLabel stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />
            </>)
    );
}
