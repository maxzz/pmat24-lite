import { type SubmitFields } from "./9-types";

export function areTheSame(from: SubmitFields.ForAtoms, to: SubmitFields.ForAtoms): boolean {
    const rv = (
        from.selected === to.selected &&
        from.doSubmit === to.doSubmit &&
        from.isSubmitTypeUndefined === to.isSubmitTypeUndefined
    );
    return rv;
}
