import { FieldTyp, SUBMIT, type Meta } from "@/store/manifest";
import { type SubmitFieldTypes } from "./9-types";

export function forAtoms(metaForm: Meta.Form): SubmitFieldTypes.ForAtoms {
    const isWeb = !!metaForm?.mani.detection.web_ourl;

    const buttonFields = getButtonFields(metaForm);
    const useItButtonIdx = getUseItButtonIdx(buttonFields);
    const buttonNameItems = getButtonNameItems(buttonFields, isWeb);

    const submittype = metaForm.mani.options?.submittype;
    const isSubmitTypeUndefined = !submittype;
    const doSubmit = submittype === SUBMIT.dosubmit || useItButtonIdx !== -1;
    

    const initialSelected = 1 + (
        !doSubmit && useItButtonIdx === -1
            ? -1
            : isWeb
                ? doSubmit
                    ? 0
                    : -1
                : useItButtonIdx
    );

    const rv: SubmitFieldTypes.ForAtoms = {
        buttonNameItems,
        selected: initialSelected,
        doSubmit,
        isSubmitTypeUndefined,
    };

    return rv;
}

function getButtonFields(metaForm: Meta.Form): Meta.Field[] {
    return metaForm.fields?.filter(
        (field) => field.ftyp === FieldTyp.button || field.mani.submit // IE <a> tags were marked as 'submit=1'
    ) || [];
}

function getUseItButtonIdx(buttonFields: Meta.Field[]): number {
    let rv = buttonFields.findIndex((field) => field.mani.useit);
    return rv;
}

function getButtonNameItems(buttonFields: Meta.Field[], isWeb: boolean): SubmitFieldTypes.ButtonNameItem[] {
    const noSubmitOption = !isWeb && !buttonFields.length;

    const rv: SubmitFieldTypes.ButtonNameItem[] = [{
        name: noSubmitOption ? "There is no control to submit" : "Don't submit",
        metaField: null,
    }];

    if (isWeb) {
        rv.push({
            name: "Submit",
            metaField: null,
        });
    } else {
        let NameIdx = 0;
        rv.push(...buttonFields.map(
            (field) => ({
                name: field.mani.displayname || `No name ${++NameIdx}`,
                metaField: field,
            })
        ));
    }

    return rv;
}
