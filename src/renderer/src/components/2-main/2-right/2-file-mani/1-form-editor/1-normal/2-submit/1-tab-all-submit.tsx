import { Meta } from "@/store/manifest";
import { ManiAtoms, NFormContextProps, NormalFormAtoms } from "@/store/atoms/3-file-mani-atoms";
import { RadioGroup } from "./2-radio-group";
import { useAtom, useAtomValue } from "jotai";

function ManiSection2_Submit({ maniAtoms, formAtoms, metaForm }: { maniAtoms: ManiAtoms; formAtoms: NormalFormAtoms; metaForm: Meta.Form; }) {

    const buttonNames = useAtomValue(formAtoms.submitAtoms.buttonNamesAtom);
    const [selected, setSelected] = useAtom(formAtoms.submitAtoms.selectedAtom);

    return (
        <RadioGroup
            items={buttonNames}
            groupName={`submit-form-${metaForm?.type}`}
            selected={selected}
            setSelected={setSelected}
        />
    );
}

export function TabSubmitOld({ maniAtoms, formAtoms, formIdx }: NFormContextProps) {
    if (!formAtoms.normal) {
        return null;
    }
    const metaForm = formAtoms.fileUsParams.fileUs.meta?.[formIdx]!; // We are under FormEditor umbrella, so we can safely use ! here
    return (
        <div className="px-1">
            <ManiSection2_Submit maniAtoms={maniAtoms} formAtoms={formAtoms.normal} metaForm={metaForm} />
        </div>
    );
}
