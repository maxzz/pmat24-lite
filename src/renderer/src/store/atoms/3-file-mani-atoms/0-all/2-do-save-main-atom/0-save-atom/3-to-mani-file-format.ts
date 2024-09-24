import { SUBMIT, type FileMani, type Mani } from "@/store/manifest";

export function toManiFileFormat(newMani: Partial<Mani.Manifest>): FileMani.Manifest {

    const fileMani: FileMani.Manifest = {
        descriptor: newMani.descriptor!,
        options: newMani.options,
        forms: newMani.forms?.map(
            (form) => {
                const newForm: FileMani.Form = {
                    detection: convertDetection(form.detection),
                    options: convertOptions(form.options),
                    fields: form.fields.map(
                        (field) => {
                            const newField: FileMani.Field = {
                                detection: field.detection,
                                options: field.options,
                            };
                            if (field.normal) {
                                newField.normal = {
                                    detection: field.normal.detection,
                                    options: field.normal.options,
                                };
                            }
                            if (field.manual) {
                                newField.manual = {
                                    detection: field.manual.detection,
                                    options: field.manual.options,
                                };
                            }
                            return newField;
                        }
                    ),
                };
                return newForm;
            }
        ),
    };

    return fileMani;
}

function convertDetection(detection: Mani.Detection): FileMani.Detection {
    return {
        ...detection as FileMani.Detection,
        ...(detection.web_checkurl && { web_checkurl: '1' }),
    };
}

function convertOptions(options: Mani.Options): FileMani.Options {
    return {
        ...options as FileMani.Options,
        ...(options.submittype && { submittype: options.submittype as 'dosubmit' | `nosubmit` }),
        ...(options.autoprompt && { autoprompt: '1' }),
    };
}
