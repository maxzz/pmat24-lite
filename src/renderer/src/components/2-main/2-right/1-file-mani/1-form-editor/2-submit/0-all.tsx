import { useEffect, useState } from 'react';
import { FieldTyp, Meta, SUBMIT } from '@/store/manifest';
import { RadioGroup } from './1-radio-group';

export function ManiSection2_Submit({ form }: { form: Meta.Form | undefined; }) {
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

import { FileUs, FormIdx } from "@/store/store-types";

export function TabSubmit({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const metaForm = fileUs.meta?.[formIdx];
    return (
        <div className="ml-1">
            <ManiSection2_Submit form={metaForm} />
        </div>
    );
}
