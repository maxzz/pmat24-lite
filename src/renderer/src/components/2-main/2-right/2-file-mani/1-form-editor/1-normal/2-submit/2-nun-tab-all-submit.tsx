import { useAtom, useAtomValue } from "jotai";
import { type Meta } from "@/store/manifest";
import { type NFormContextProps, type NFormCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { RadioGroup } from "./3-nun-radio-group-for";

function ManiSection2_Submit({ nFormCtx, metaForm }: { nFormCtx: NFormCtx; metaForm: Meta.Form; }) {

    const buttonNameItems = useAtomValue(nFormCtx.submitCtx.buttonNameItemsAtom);
    const buttonNameStrings = buttonNameItems.map(({ name }) => name);
    const [selected, setSelected] = useAtom(nFormCtx.submitCtx.selectedAtom);

    return (
        <RadioGroup
            items={buttonNameStrings}
            groupName={`submit-form-${metaForm?.type}`}
            selected={selected}
            setSelected={setSelected}
        />
    );
}

export function TabSubmitOld({ nAllAtoms, formIdx }: NFormContextProps) {
    const metaForm = nAllAtoms.fileUsCtx.fileUs.parsedSrc.meta?.[formIdx]!; // We are under FormEditor umbrella, so we can safely use ! here
    return (
        <div className="px-1">
            <ManiSection2_Submit nFormCtx={nAllAtoms.normal} metaForm={metaForm} />
        </div>
    );
}
