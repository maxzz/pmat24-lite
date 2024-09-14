import { FieldTyp, type Meta, SUBMIT } from "@/store/manifest";
import { type SubmitConvTypes } from "./0-conv/9-types";

export function getSubmitChoices(metaForm: Meta.Form) {
    const isWeb = !!metaForm?.mani.detection.web_ourl;

    const buttonFields = getButtonFields(metaForm);
    const buttonNames = getButtonNames(buttonFields, isWeb);

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
        buttonNames,
        initialSelected,
    };
}

function getButtonFields(metaForm: Meta.Form): Meta.Field[] {
    return metaForm.fields?.filter(
        (field) => field.ftyp === FieldTyp.button || field.mani.submit
    ) || [];
}

function getButtonNames(buttonFields: Meta.Field[], isWeb: boolean): SubmitConvTypes.ButtonNameItem[] {
    const noSubmitOption = !isWeb && !buttonFields.length;

    const rv: SubmitConvTypes.ButtonNameItem[] =
        noSubmitOption
            ? [
                {
                    name: 'There is no control to submit',
                    metaField: null,
                }
            ]
            : [{
                name: 'Do not submit',
                metaField: null,
            }];

    if (isWeb) {
        rv.push({
            name: 'Submit form data after filling out fields',
            metaField: null,
        });
    } else {
        let NameIdx = 0;
        rv.push(...buttonFields.map(
            (field) => {
                return (
                    field.mani.displayname
                        ? {
                            name: field.mani.displayname,
                            metaField: field,
                        }
                        : {
                            name: `No name ${++NameIdx}`,
                            metaField: field,
                        }
                );
            }
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
