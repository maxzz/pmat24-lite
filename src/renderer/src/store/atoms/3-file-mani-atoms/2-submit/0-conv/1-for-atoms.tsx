import { type Meta } from "pm-manifest";
import { getSubmitChoices } from "../9-submit-choices";
import { type SubmitConvTypes } from "./9-types";

export function forAtoms(metaForm: Meta.Form): SubmitConvTypes.SubmitForAtoms {
    const { buttonNames, initialSelected } = getSubmitChoices(metaForm);

    const doSubmit = metaForm.mani.options?.submittype === 'dosubmit';
    const isDoSubmitUndefined = typeof metaForm.mani.options?.submittype === 'undefined';

    const rv: SubmitConvTypes.SubmitForAtoms = {
        buttonNames,
        selected: initialSelected,
        doSubmit,
        isDoSubmitUndefined,
    };
    
    return rv;
}
