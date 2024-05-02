import { useEffect, useState } from "react";
import { FileUs, FormIdx } from "@/store/store-types";
import { FieldTyp, Meta, SUBMIT } from "@/store/manifest";
import { FormAtoms, ManiAtoms } from "@/store/atoms/3-file-mani-atoms";
import { RadioGroup } from "./2-radio-group";

function ManiSection2_Submit({ maniAtoms, formAtoms, form }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; form: Meta.Form; }) {

    const [items, setItems] = useState<string[]>([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const isWeb = !!form?.mani.detection.web_ourl;

        const submits = form?.fields?.filter((field) => field.ftyp === FieldTyp.button || field.mani.submit) || [];
        const submitNames = isWeb ? [] : submits.map((field) => field.mani.displayname || 'no name');

        let buttonSelected = -1;
        submits.forEach((field, idx) => field.mani.useit && (buttonSelected = idx));

        const forceSubmit = form?.mani?.options?.submittype === SUBMIT.dosumbit;
        const initialSelected = (forceSubmit || buttonSelected !== -1 ? isWeb ? 0 : buttonSelected : -1) + 1;

        setItems(['Do Not Submit', ...(isWeb ? ['Automatically submit login data'] : submitNames)]);
        setSelected(initialSelected);
    }, [form]);

    return (
        <RadioGroup
            items={items}
            groupName={`submit-form-${form?.type}`}
            selected={selected}
            setSelected={setSelected}
        />
    );
}

export function TabSubmit({ maniAtoms, formAtoms, fileUs, formIdx }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; fileUs: FileUs; formIdx: FormIdx; }) {
    const metaForm = fileUs.meta?.[formIdx];
    if (!metaForm) {
        return null;
    }
    return (
        <div className="px-1">
            <ManiSection2_Submit maniAtoms={maniAtoms} formAtoms={formAtoms} form={metaForm} />
        </div>
    );
}
