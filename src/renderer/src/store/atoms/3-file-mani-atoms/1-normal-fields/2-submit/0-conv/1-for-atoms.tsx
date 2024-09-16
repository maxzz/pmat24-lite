import { type Meta } from "@/store/manifest";
import { type SubmitConvTypes } from "./9-types";
import { getSubmitChoices } from "../9-get-submit-choices";

export function forAtoms(metaForm: Meta.Form): SubmitConvTypes.SubmitForAtoms {
    
    const { buttonNameItems, initialSelected } = getSubmitChoices(metaForm);

    const doSubmit = metaForm.mani.options?.submittype === 'dosubmit';
    const isDoSubmitUndefined = typeof metaForm.mani.options?.submittype === 'undefined';

    const rv: SubmitConvTypes.SubmitForAtoms = {
        buttonNameItems,
        selected: initialSelected,
        doSubmit,
        isDoSubmitUndefined,
    };
    
    return rv;
}
