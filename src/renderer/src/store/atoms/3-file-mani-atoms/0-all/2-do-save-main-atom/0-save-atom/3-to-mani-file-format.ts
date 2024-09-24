import { SUBMIT, type FileMani, type Mani } from "@/store/manifest";
import { filterEmptyValues } from "./7-filter-empty-values";

//TODO: order is wrong

export function toManiFileFormat(newMani: Partial<Mani.Manifest>): FileMani.Manifest {

    const rv: FileMani.Manifest = {
        descriptor: newMani.descriptor!,
        options: newMani.options,
        forms: newMani.forms?.map(convForm).filter(Boolean),
    };

    return rv;
}

function convertDetection(detection: Mani.Detection): FileMani.Detection {
    const rv: FileMani.Detection = {
        ...detection as FileMani.Detection,
        ...(detection.web_checkurl && { web_checkurl: '1' }),
    };
    return rv;
}

function convertOptions(options: Mani.Options): FileMani.Options {
    const rv: FileMani.Options = {
        ...options as FileMani.Options,
        ...(options.submittype && { submittype: options.submittype as 'dosubmit' | `nosubmit` }),
        ...(options.autoprompt && { autoprompt: '1' }),
    };
    return filterEmptyValues(rv)!;
}

function convForm(form: Mani.Form): FileMani.Form {
    const newForm: FileMani.Form = {
        detection: convertDetection(form.detection),
        options: convertOptions(form.options),
        fields: form.fields.map(
            (field) => {
                const newField: FileMani.Field = {
                    ...field as FileMani.Field,
                };
                return newField;
            }
        ),
    };
    return newForm;
}
