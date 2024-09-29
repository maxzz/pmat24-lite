import { type OFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";

export function Part1General({ ctx }: { ctx: OFormContextProps; }) {
    const { descAtom, hintAtom, balloonAtom } = ctx.oFormAtoms.options.p1General;
    return (<>
        <RowInputWTitle stateAtom={descAtom} label="Description" />
        <RowInputWTitle stateAtom={hintAtom} label="User hint" />
        <RowInputWTitle stateAtom={balloonAtom} label="Show balloon" />
    </>);
}
