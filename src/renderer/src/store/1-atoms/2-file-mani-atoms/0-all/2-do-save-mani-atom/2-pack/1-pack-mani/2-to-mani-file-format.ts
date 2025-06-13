import { FormIdx, type FileMani, type Mani } from "@/store/manifest";
import { filterOneLevelEmptyValues } from "./3-filter-empty-values";

//TODO: order is wrong

export function toManiFileFormat(newMani: Partial<Mani.Manifest>): FileMani.Manifest {
    const rv: FileMani.Manifest = {
        descriptor: newMani.descriptor!,
        options: newMani.options,
        forms: newMani.forms?.map(convertForm).filter(Boolean),
    };
    return rv;
}

function convertForm(form: Mani.Form, idx: number): FileMani.Form {
    let rv: FileMani.Form = {
        fcontext: idx === FormIdx.cpass ? { type: 'pchange', name: '1', } : undefined,
        detection: convertFormDetection(form.detection),
        options: convertFormOptions(form.options),
        fields: form.fields.map(convertField),
    };
    rv = filterOneLevelEmptyValues(rv)!;
    return rv;
}

function convertFormDetection(detection: Mani.Detection): FileMani.Detection {
    let rv: FileMani.Detection = {
        ...detection as FileMani.Detection,
        ...(detection.web_checkurl && { web_checkurl: '1' }),
    };
    rv = filterOneLevelEmptyValues(rv)!;
    return rv;
}

function convertFormOptions(options: Mani.Options): FileMani.Options {
    const rv: FileMani.Options = {
        ...options as FileMani.Options,
        ...(options.submittype && { submittype: options.submittype as 'dosubmit' | `nosubmit` }),
        ...(options.autoprompt && { autoprompt: '1' }),
    };
    if (rv.balooncount === '3') {
        delete rv.balooncount;
    }
    return filterOneLevelEmptyValues(rv)!;
}

function convertField(field: Mani.Field): FileMani.Field {
    let rv: FileMani.Field = {
        ...field as FileMani.Field,
    };

    convertNumbersToString(rv);

    rv = filterOneLevelEmptyValues(rv)!;
    return rv;
}

function convertNumbersToString(field: FileMani.Field) {
    if (!!field.rfieldindex && (field.rfieldindex as any) === -1) { // mani.rfieldindex defined as string in manifest but in editor it is number
        field.rfieldindex = '';
    }

    if (!!field.rfieldform && (field.rfieldform as any) === -1) { // mani.rfieldform defined as string in manifest but in editor it is number
        field.rfieldform = '';
    }

    field.rfieldindex = field.rfieldindex && `${field.rfieldindex}`;
    field.rfieldform = field.rfieldform && `${field.rfieldform}`;
}
