import { type SubmitConvTypes } from "./9-types";

export function areTheSame(from: SubmitConvTypes.SubmitForAtoms, to: SubmitConvTypes.SubmitForAtoms): boolean {
    const rv = (
        from.selected === to.selected &&
        from.doSubmit === to.doSubmit &&
        from.isSubmitTypeUndefined === to.isSubmitTypeUndefined
    );
    return rv;
}
