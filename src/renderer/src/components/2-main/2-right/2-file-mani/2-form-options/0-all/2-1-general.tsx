import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { InputWithTitle2Cols } from "@/ui/local-ui";

export function Block1_General({ ctx }: { ctx: OFormContextProps; }) {
    const { descAtom, hintAtom, balloonAtom } = ctx.oAllAtoms.options.p1General;
    return (<>
        <InputWithTitle2Cols stateAtom={descAtom} label="Description" />
        <InputWithTitle2Cols stateAtom={hintAtom} label="User hint" />
        <InputWithTitle2Cols stateAtom={balloonAtom} label="First login notification counter" containerClasses="!w-16" />
    </>);
}
