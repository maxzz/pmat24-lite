import { type SubmitFieldTypes } from "./9-types";

export function fromAtoms(atoms: SubmitFieldTypes.Ctx, { get }: GetSet): SubmitFieldTypes.ForAtoms {
    const { buttonNameItemsAtom, selectedAtom, doSubmitAtom, isSubmitTypeUndefinedAtom } = atoms;

    const rv = {
        buttonNameItems: get(buttonNameItemsAtom),
        selected: get(selectedAtom),
        doSubmit: get(doSubmitAtom),
        isSubmitTypeUndefined: get(isSubmitTypeUndefinedAtom),
    };

    return rv;
}
