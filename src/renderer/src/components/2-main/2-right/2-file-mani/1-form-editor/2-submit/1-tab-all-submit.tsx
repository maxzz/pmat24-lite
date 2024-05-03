import { useEffect, useState } from "react";
import { FieldTyp, Meta, SUBMIT } from "@/store/manifest";
import { FormAtoms, ManiAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { RadioGroup } from "./2-radio-group";

function getButtonFields(metaForm: Meta.Form): Meta.Field[] {
    return metaForm.fields?.filter((field) => field.ftyp === FieldTyp.button || field.mani.submit) || [];
}

function getButtonNames(isWeb: boolean, buttonFields: Meta.Field[]): string[] {
    const rv = ['Do Not Submit'];
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

function getIsForceSubmit(metaForm: Meta.Form): boolean {
    return metaForm?.mani?.options?.submittype === SUBMIT.dosumbit;
}

function ManiSection2_Submit({ maniAtoms, formAtoms, metaForm }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; metaForm: Meta.Form; }) {

    const [items, setItems] = useState<string[]>([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const isWeb = !!metaForm?.mani.detection.web_ourl;

        const buttonFields = getButtonFields(metaForm);
        const buttonNames = getButtonNames(isWeb, buttonFields);
        const selectedButtonIdx = getSelectedButtonIdx(isWeb, buttonFields);
        const forceSubmit = getIsForceSubmit(metaForm);

        const initialSelected = (
            forceSubmit || selectedButtonIdx !== -1
                ? isWeb
                    ? 0
                    : selectedButtonIdx
                : -1
        ) + 1;

        setItems([
            'Do Not Submit',
            ...(isWeb ? ['Automatically submit login data'] : buttonNames)
        ]);

        setSelected(initialSelected);
    }, [metaForm]);

    return (
        <RadioGroup
            items={items}
            groupName={`submit-form-${metaForm?.type}`}
            selected={selected}
            setSelected={setSelected}
        />
    );
}

export function TabSubmit({ maniAtoms, formAtoms, formIdx }: TabSectionProps) {
    const metaForm = formAtoms.params.fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
    return (
        <div className="px-1">
            <ManiSection2_Submit maniAtoms={maniAtoms} formAtoms={formAtoms} metaForm={metaForm} />
        </div>
    );
}
