import { FieldTyp, Meta, SUBMIT } from "@/store/manifest";

function getButtonFields(metaForm: Meta.Form): Meta.Field[] {
    return metaForm.fields?.filter((field) => field.ftyp === FieldTyp.button || field.mani.submit) || [];
}
function getButtonNames(buttonFields: Meta.Field[], isWeb: boolean): string[] {
    const noSubmitOption = !isWeb && !buttonFields.length;

    const rv = noSubmitOption ? ['There is no control to submit'] : ['Do not submit'];
    if (isWeb) {
        rv.push('Automatically submit login data');
    } else {
        let NameIdx = 0;
        rv.push(...buttonFields.map((field) => field.mani.displayname || `no name ${++NameIdx}`));
    }
    return rv;
}
function getSelectedButtonIdx(isWeb: boolean, buttonFields: Meta.Field[]): number {
    let rv = -1;
    buttonFields.forEach((field, idx) => field.mani.useit && (rv = idx));
    return rv;
}
function isHeuristicSubmit(metaForm: Meta.Form): boolean {
    return metaForm?.mani?.options?.submittype === SUBMIT.dosumbit;
}

export function getChoices(metaForm: Meta.Form) {
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
