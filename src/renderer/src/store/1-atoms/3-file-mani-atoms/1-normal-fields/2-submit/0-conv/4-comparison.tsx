import { type SubmitFieldTypes } from "./9-types";

export function areTheSame(from: SubmitFieldTypes.ForAtoms, to: SubmitFieldTypes.ForAtoms): boolean {
    const rv = (
        from.selected === to.selected &&
        from.doSubmit === to.doSubmit &&
        from.isSubmitTypeUndefined === to.isSubmitTypeUndefined
    );
    return rv;
}
