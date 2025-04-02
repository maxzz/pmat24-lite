import { type Mani } from "pm-manifest";

/**
 * Clean up names_ext. We don't use any sub-class names (at least for now) for manual mode forms.
 * The rule is: don't look inside the window content.
 * @param form - Form to duplicate from
 * @returns New duplicated form
 */
export function createManualModeFormFrom(form: Mani.Form): Mani.Form {

    const rv: Mani.Form = {
        detection: { ...form.detection },
        options: form.options,
        fields: [],
    };
    
    rv.detection.names_ext = "";

    return rv;
}

//TODO: move it bacl to manifest package
