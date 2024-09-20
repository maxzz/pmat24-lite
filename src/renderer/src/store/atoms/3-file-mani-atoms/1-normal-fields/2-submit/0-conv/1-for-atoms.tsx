import { FieldTyp, SUBMIT, type Meta } from "@/store/manifest";
import { type SubmitConvTypes } from "./9-types";

export function forAtoms(metaForm: Meta.Form): SubmitConvTypes.SubmitForAtoms {
    const isWeb = !!metaForm?.mani.detection.web_ourl;

    const buttonFields = getButtonFields(metaForm);
    const buttonNameItems = getButtonNameItems(buttonFields, isWeb);

    const submittype = metaForm.mani.options?.submittype;
    const isSubmitTypeUndefined = !submittype;
    const doSubmit = submittype === SUBMIT.dosumbit || getUseItButtonIdx(buttonFields) !== -1;

    const selectedButtonIdx = getSelectedUseitButtonIdx(buttonFields);

    const initialSelected = 1 + (
        !doSubmit && selectedButtonIdx === -1
            ? -1
            : isWeb
                ? doSubmit
                    ? 0
                    : -1
                : selectedButtonIdx
    );

    const rv: SubmitConvTypes.SubmitForAtoms = {
        buttonNameItems,
        selected: initialSelected,
        doSubmit,
        isSubmitTypeUndefined,
    };

    return rv;
}

function getButtonNameItems(buttonFields: Meta.Field[], isWeb: boolean): SubmitConvTypes.ButtonNameItem[] {
    const noSubmitOption = !isWeb && !buttonFields.length;

    const rv: SubmitConvTypes.ButtonNameItem[] = [{
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

function getButtonFields(metaForm: Meta.Form): Meta.Field[] {
    return metaForm.fields?.filter(
        (field) => field.ftyp === FieldTyp.button || field.mani.submit // we collect IE <a> so they are marked as submit
    ) || [];
}

function getSelectedUseitButtonIdx(buttonFields: Meta.Field[]): number {
    let rv = buttonFields.findIndex((field) => field.mani.useit);
    return rv;
}

function getUseItButtonIdx(buttonFields: Meta.Field[]): number {
    let rv = buttonFields.findIndex((field) => (field.mani.type === 'button' || field.mani.submit) && field.mani.useit);
    return rv;
}
