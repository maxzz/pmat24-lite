import { useAtom, useAtomValue } from "jotai";
import { type Meta } from "@/store/manifest";
import { type NFormContextProps, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { RadioGroup } from "./2-radio-group-for-nun";

function ManiSection2_Submit({ formAtoms, metaForm }: { formAtoms: NFormCtx; metaForm: Meta.Form; }) {

    const buttonNames = useAtomValue(formAtoms.submitAtoms.buttonNamesAtom);
    const buttonNameStrings = buttonNames.map(({ name }) => name);
    const [selected, setSelected] = useAtom(formAtoms.submitAtoms.selectedAtom);

    return (
        <RadioGroup
            items={buttonNameStrings}
            groupName={`submit-form-${metaForm?.type}`}
            selected={selected}
            setSelected={setSelected}
        />
    );
}

export function TabSubmitOld({ formAtoms, formIdx }: NFormContextProps) {
    const metaForm = formAtoms.fileUsCtx.fileUs.meta?.[formIdx]!; // We are under FormEditor umbrella, so we can safely use ! here
    return (
        <div className="px-1">
            <ManiSection2_Submit formAtoms={formAtoms.normal} metaForm={metaForm} />
        </div>
    );
}
