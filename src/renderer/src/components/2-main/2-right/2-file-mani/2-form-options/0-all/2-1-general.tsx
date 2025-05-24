import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { RowInputWTitle2Cols } from "@/ui/local-ui";

export function Block1_General({ ctx }: { ctx: OFormContextProps; }) {
    const { descAtom, hintAtom, balloonAtom } = ctx.oAllAtoms.options.p1General;
    return (<>
        <RowInputWTitle2Cols stateAtom={descAtom} label="Description" />
        <RowInputWTitle2Cols stateAtom={hintAtom} label="User hint" />
        <RowInputWTitle2Cols stateAtom={balloonAtom} label="First login notification counter" containerClasses="!w-16" />
    </>);
}
