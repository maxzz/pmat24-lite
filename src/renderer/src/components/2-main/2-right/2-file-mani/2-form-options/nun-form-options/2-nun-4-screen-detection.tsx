import { useAtomValue } from "jotai";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { InputWithTitle2Cols } from "@/ui/local-ui";

export function Block4_ScreenDetection({ oFormProps }: { oFormProps: OFormProps; }) {

    const atoms = oFormProps.oAllAtoms.options;
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
                <InputWithTitle2Cols stateAtom={ourlAtom} label="Original URL" />
                <InputWithTitle2Cols stateAtom={murlAtom} label="Match URL" />
            </>)
            : (<>
                <InputWithTitle2Cols stateAtom={captionAtom} label="Windows caption" />
                <InputWithTitle2Cols stateAtom={monitorAtom} label="Monitor screen changes" asCheckbox />

                <InputWithTitle2Cols stateAtom={dlg_classAtom} label="Window class name" />
                <InputWithTitle2Cols stateAtom={dlg_tabAtom} label="Window tab" />
                <InputWithTitle2Cols stateAtom={dlg_checkexeAtom} label="Tab executable" />

                <InputWithTitle2Cols stateAtom={processnameAtom} label="Process name" />
                <InputWithTitle2Cols stateAtom={commandlineAtom} label="Command line" />
            </>)
    );
}
