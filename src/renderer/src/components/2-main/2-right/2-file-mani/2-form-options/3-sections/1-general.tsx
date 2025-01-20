import { type OFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";

export function Part1General({ ctx }: { ctx: OFormContextProps; }) {
    const { descAtom, hintAtom, balloonAtom } = ctx.oAllAtoms.options.p1General;
    return (<>
        <RowInputWTitle stateAtom={descAtom} label="Description" />
        <RowInputWTitle stateAtom={hintAtom} label="User hint" />
        <RowInputWTitle stateAtom={balloonAtom} label="First login notification counter" containerClasses="!w-16" />
    </>);
}
