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
    if (rv.rfieldindex as any === -1) { // it is defined as string in manifest but in editor it is number //TODO: check if we write it as string not number for compatibility
        delete rv.rfieldindex;
        delete rv.rfield;
    }
    if (rv.rfieldform as any === -1) { // it is defined as string in manifest but in editor it is number //TODO: check if we write it as string not number for compatibility
        delete rv.rfieldform;
        delete rv.rfield;
    }
    rv = filterOneLevelEmptyValues(rv)!;
    return rv;
}
