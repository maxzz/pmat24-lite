import { FieldTyp, type Meta, SUBMIT } from "@/store/manifest";
import { type SubmitConvTypes } from "./0-conv/9-types";

export function getSubmitChoices(metaForm: Meta.Form) {
    const isWeb = !!metaForm?.mani.detection.web_ourl;

    const buttonFields = getButtonFields(metaForm);
    const buttonNameItems = getButtonNameItems(buttonFields, isWeb);

    const selectedButtonIdx = getSelectedButtonIdx(isWeb, buttonFields);
    const heuristicSubmit = isHeuristicSubmit(metaForm);

    const initialSelected = (
        heuristicSubmit || selectedButtonIdx !== -1
            ? isWeb
                ? 0
                : selectedButtonIdx
            : -1
    ) + 1;

    return {
        buttonNameItems,
        initialSelected,
    };
}

function getButtonFields(metaForm: Meta.Form): Meta.Field[] {
    return metaForm.fields?.filter(
        (field) => field.ftyp === FieldTyp.button || field.mani.submit // we collect IE <a> so they are marked as submit
    ) || [];
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

function getSelectedButtonIdx(isWeb: boolean, buttonFields: Meta.Field[]): number {
    let rv = -1;

    buttonFields.forEach(
        (field, idx) => field.mani.useit && (rv = idx)
    );

    return rv;
}

function isHeuristicSubmit(metaForm: Meta.Form): boolean {
    return metaForm?.mani?.options?.submittype === SUBMIT.dosumbit;
}
