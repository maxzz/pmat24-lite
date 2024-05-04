import { useEffect, useState } from "react";
import { Meta } from "@/store/manifest";
import { FormAtoms, ManiAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { RadioGroup } from "./2-radio-group";
import { getChoices } from "../../../../../../store/atoms/3-file-mani-atoms/2-submit/9-submit-choices";

function ManiSection2_Submit({ maniAtoms, formAtoms, metaForm }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; metaForm: Meta.Form; }) {

    const [submitNames, setSubmitNames] = useState<string[]>([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const { buttonNames, initialSelected } = getChoices(metaForm);

        setSubmitNames(buttonNames);
        setSelected(initialSelected);
    }, [metaForm]);

    return (
        <RadioGroup
            items={submitNames}
            groupName={`submit-form-${metaForm?.type}`}
            selected={selected}
            setSelected={setSelected}
        />
    );
}

export function TabSubmit({ maniAtoms, formAtoms, formIdx }: TabSectionProps) {
    const metaForm = formAtoms.params.fileUs.meta?.[formIdx]!; // We are under FormEditor umbrella, so we can safely use ! here
    return (
        <div className="px-1">
            <ManiSection2_Submit maniAtoms={maniAtoms} formAtoms={formAtoms} metaForm={metaForm} />
        </div>
    );
}
