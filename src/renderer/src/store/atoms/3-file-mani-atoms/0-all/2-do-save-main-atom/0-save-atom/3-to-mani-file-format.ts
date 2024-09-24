import { type FileMani, type Mani } from "@/store/manifest";

export function toManiFileFormat(newMani: Partial<Mani.Manifest>): FileMani.Manifest {

    const fileMani: FileMani.Manifest = {
        descriptor: newMani.descriptor,
        options: newMani.options,
        forms: newMani.forms?.map(
            (form) => {
                const newForm: FileMani.Form = {
                    detection: form.detection,
                    options: form.options,
                    fields: form.fields.map(field => {
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
                    }),
                };
                return newForm;
            }
        ),
    };

    return fileMani;
}
