import { type OFormProps } from "@/store/2-file-mani-atoms";
import { InputWithTitle2Cols } from "@/ui/local-ui";

export function Block1_General({ oFormProps }: { oFormProps: OFormProps; }) {
    const { descAtom, hintAtom, balloonAtom } = oFormProps.oAllAtoms.options.p1General;
    return (<>
        <InputWithTitle2Cols stateAtom={descAtom} label="Description" />
        <InputWithTitle2Cols stateAtom={hintAtom} label="User hint" />
        <InputWithTitle2Cols stateAtom={balloonAtom} label="First login notification counter" containerClasses="w-16!" />
    </>);
}
